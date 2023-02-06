import archiver from "archiver";
import { createWriteStream, readFileSync } from "fs";
import { join } from "path";

const { name } = JSON.parse(readFileSync("./package.json"));
const cwd = process.cwd();
const zipPath = join(cwd, `${name}-submission.zip`);
const output = createWriteStream(zipPath);
const archive = archiver("zip", {
  zlib: { level: 9 },
});

archive.pipe(output);
archive.glob("*.ts", { cwd: join(process.cwd(), "src") });
archive.finalize().then(() => {
  output.close();
  console.log("Successfully zipped submission: " + zipPath);
});
