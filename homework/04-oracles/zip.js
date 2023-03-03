import archiver from "archiver";
import { createWriteStream, readFileSync, rmSync } from "fs";
import { join } from "path";

const { name } = JSON.parse(readFileSync("./package.json"));
const cwd = process.cwd();
const zipPath = join(cwd, `${name}-submission.zip`);
const output = createWriteStream(zipPath);
const archive = archiver("zip", {
  zlib: { level: 9 },
});

archive.pipe(output);
archive.directory("src/", "ts/");

archive.glob("*.js", { cwd: join(".", "out", "src") }, { prefix: "js/" });

archive.on("finish", () => {
  output.close();
  rmSync(join(".", "out"), { recursive: true, force: true });
  console.log("Successfully zipped submission: " + zipPath);
});

archive.finalize();
