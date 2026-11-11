const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const projectRoot = path.resolve(__dirname, "..");
const inputFile = path.join(projectRoot, "assets-source/models/character.glb");
const outputFile = path.join(projectRoot, "public/models/character.enc");
const password = "Character3D#@";

if (!fs.existsSync(inputFile)) {
  throw new Error(`Character source model not found: ${inputFile}`);
}

const key = crypto.createHash("sha256").update(password).digest();
const iv = crypto.randomBytes(16);
const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
const input = fs.createReadStream(inputFile);
const output = fs.createWriteStream(outputFile);

output.write(iv);
input.pipe(cipher).pipe(output);
output.on("finish", () => {
  console.log(`Encrypted character model written to ${outputFile}`);
});
