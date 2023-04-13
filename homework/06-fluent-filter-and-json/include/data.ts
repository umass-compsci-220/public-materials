import { faker } from "@faker-js/faker";
import fs from "fs";
import path from "path";

const DATA_FOLDER = path.resolve(process.cwd(), "include", "data");
if (!fs.existsSync(DATA_FOLDER)) {
  fs.mkdirSync(DATA_FOLDER, { recursive: true });
}

interface BusinessAttributes {
  Ambience?: Record<string, boolean>;
}

export interface Business {
  business_id: string;
  name?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  latitude?: number;
  longitude?: number;
  stars?: number;
  review_count?: number;
  attributes?: BusinessAttributes;
  categories?: string[];
  hours?: Record<string, string>;
}

/**
 * Loads the Yelp Dataset
 * @returns
 */
export function loadYelpData(part?: number): Business[] {
  if (part !== undefined && Number.isInteger(part) && 0 <= part && part <= 9) {
    return loadBusinesses(`yelp${part}.json`);
  }

  return loadOrCreate("yelpMerged", () => {
    const businesses: Business[] = [];

    for (let i = 0; i < 10; i++) {
      const p = path.join(DATA_FOLDER, `yelp${i}.json`);

      businesses.push(...loadBusinesses(p));
    }

    return businesses;
  });
}

/**
 *
 * @param fileName
 * @param f
 */
export function loadOrCreate(fileName: string, f: () => Business[]): Business[] {
  const p = path.join(DATA_FOLDER, `${fileName}.json`);
  if (fs.existsSync(p)) {
    return loadBusinesses(p);
  }

  const data = f();
  const json = JSON.stringify(data);
  fs.writeFileSync(p, json, { encoding: "utf-8" });

  return data;
}

/**
 * Reads the contents of a JSON file, assumed to contain an array of Business objects, and returns the parsed content
 * @param path A path to a JSON file with business data
 * @returns The parsed contents of the file
 */
function loadBusinesses(path: string): Business[] {
  const content = fs.readFileSync(path, "utf-8");

  return JSON.parse(content) as Business[];
}

/**
 *
 * @param n The number of Business objects to create
 */
export function createRandomData(n: number): Business[] {
  const data: Business[] = [];

  const generators: ((b: Business) => void)[] = [
    b => (b.name = faker.company.name()),
    b => {
      b.state = faker.address.stateAbbr();
      b.postal_code = faker.address.zipCodeByState(b.state);
      b.city = faker.address.cityName();
    },
    b => {
      b.longitude = faker.datatype.float({ min: -90, max: 90, precision: 0.000001 });
      b.latitude = faker.datatype.float({ min: -180, max: 180, precision: 0.00001 });
    },
    b => {
      b.stars = faker.datatype.number({ min: 0, max: 5 });
    },
    b => {
      b.review_count = faker.datatype.number({ min: 0, max: 100 });
    },
    b => {
      b.attributes = { Ambience: {} };

      const n = faker.datatype.number({ max: 10 });
      for (let i = 0; i < n; i++) {
        if (b.attributes.Ambience) b.attributes.Ambience[faker.word.adjective()] = faker.datatype.boolean();
      }
    },
    b => {
      b.categories = [];
      const n = faker.datatype.number({ max: 10 });
      for (let i = 0; i < n; i++) {
        b.categories.push(
          faker.helpers.arrayElement([
            "ATV Rentals/Tours",
            "Airsoft",
            "Amateur Sports Teams",
            "Amusement Parks",
            "Aquariums",
            "Archery",
            "Axe Throwing",
            "Badminton",
            "Baseball Fields",
            "Basketball Courts",
            "Batting Cages",
            "Beach Equipment Rentals",
            "Beaches",
            "Bike Parking",
            "Bike Rentals",
            "Boating",
            "Bobsledding",
            "Bocce Ball",
            "Bowling",
            "Bubble Soccer",
            "Bungee Jumping",
            "Canyoneering",
            "Carousels",
            "Challenge Courses",
            "Climbing",
            "Cycling Classes",
            "Dart Arenas",
            "Day Camps",
            "Disc Golf",
            "Diving",
            "Free Diving",
            "Scuba Diving",
            "Escape Games",
            "Fencing Clubs",
            "Fishing",
            "Fitness & Instruction",
            "Aerial Fitness",
            "Barre Classes",
            "Boot Camps",
            "Boxing",
            "Cardio Classes",
            "Dance Studios",
            "Golf Lessons",
            "Gyms",
            "Circuit Training Gyms",
            "Interval Training Gyms",
            "Martial Arts",
            "Brazilian Jiu-jitsu",
            "Chinese Martial Arts",
            "Karate",
            "Kickboxing",
            "Muay Thai",
            "Taekwondo",
            "Meditation Centers",
            "Pilates",
            "Qi Gong",
            "Self-defense Classes",
            "Swimming Lessons/Schools",
            "Tai Chi",
            "Trainers",
            "Yoga",
            "Flyboarding",
            "Go Karts",
            "Golf ",
            "Gun/Rifle Ranges",
            "Gymnastics",
            "Hang Gliding",
            "Hiking",
            "Horse Racing",
            "Horseback Riding",
            "Hot Air Balloons",
            "Indoor Playcentre",
            "Jet Skis",
            "Kids Activities",
            "Kiteboarding",
            "Lakes",
            "Laser Tag",
            "Mini Golf",
            "Mountain Biking",
            "Nudist",
            "Paddleboarding",
            "Paintball",
            "Paragliding",
            "Parasailing",
            "Parks",
            "Dog Parks",
            "Skate Parks",
            "Pickleball",
            "Playgrounds",
            "Races & Competitions",
            "Racing Experience",
            "Rafting/Kayaking",
            "Recreation Centers",
            "Rock Climbing",
            "Sailing",
            "Scavenger Hunts",
            "Scooter Rentals",
            "Senior Centers",
            "Skating Rinks",
            "Skydiving",
            "Sledding",
            "Snorkeling",
            "Soccer",
            "Sports Clubs",
            "Squash",
            "Summer Camps",
            "Surfing",
            "Swimming Pools",
            "Tennis",
            "Trampoline Parks",
            "Tubing",
            "Water Parks",
            "Wildlife Hunting Ranges",
            "Ziplining",
            "Zoos",
            "Petting Zoos",
            "Zorbing",
          ])
        );
      }
    },
    b => {
      b.hours = {};
      for (const d of ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]) {
        if (Math.random() < 0.15) return;

        b.hours[d] = "0:00-0:00";
      }
    },
  ];

  for (let i = 0; i < n; i++) {
    const b: Business = {
      business_id: faker.datatype.uuid(),
    };

    for (const g of generators) {
      if (Math.random() < 0.2) continue;

      g(b);
    }

    data.push(b);
  }

  return data;
}
