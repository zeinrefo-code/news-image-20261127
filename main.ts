// main.ts — hand the day's front page to the grader.
//
// This entry is one picture, entry.png, a front page summing up the world
// news of Friday 27 November 2026. The program's only job is to place an
// exact copy of that picture at <output>/entry.png, where the grader
// expects it, and to refuse to hand over a damaged copy.
//
// Nothing is drawn or downloaded here: the artwork ships in the repo
// next to this file, so the program works with no network at all.

import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ARTWORK = "entry.png";
const MAX_BYTES = 1024 * 1024;

// A PNG always begins with these eight bytes. Anything else is not
// the picture we think we are delivering.
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

function fail(message: string): never {
  throw new Error(`entry delivery failed: ${message}`);
}

// Where the grader wants the picture. MAKEFUN_OUTPUT_DIR wins when it
// is set; otherwise the picture lands in ./output next to the repo.
function outputFolder(): string {
  const envDir = process.env.MAKEFUN_OUTPUT_DIR;
  if (envDir !== undefined && envDir.trim().length > 0) {
    return resolve(envDir);
  }
  return resolve("output");
}

function main(): void {
  const here = dirname(fileURLToPath(import.meta.url));
  const sourcePath = join(here, ARTWORK);

  if (!existsSync(sourcePath)) {
    fail(`artwork not found at ${sourcePath}`);
  }
  const bytes = readFileSync(sourcePath);
  if (bytes.length === 0) {
    fail("artwork file is empty");
  }
  if (bytes.length > MAX_BYTES) {
    fail(`artwork is ${bytes.length} bytes, over the ${MAX_BYTES} byte cap`);
  }
  if (!bytes.subarray(0, PNG_MAGIC.length).equals(PNG_MAGIC)) {
    fail("artwork does not start with the PNG magic bytes");
  }

  const dryRun = process.argv.includes("--check");
  const targetDir = outputFolder();
  const targetPath = join(targetDir, ARTWORK);

  if (dryRun) {
    console.log(
      `check ok: ${ARTWORK} is a valid PNG of ${bytes.length} bytes; ` +
        `a real run would write it to ${targetPath}`,
    );
    return;
  }

  mkdirSync(targetDir, { recursive: true });
  writeFileSync(targetPath, bytes);

  const written = readFileSync(targetPath);
  if (written.length !== bytes.length) {
    fail(
      `delivered copy is ${written.length} bytes, expected ${bytes.length}`,
    );
  }
  const sourceDigest = createHash("sha256").update(bytes).digest("hex");
  const writtenDigest = createHash("sha256").update(written).digest("hex");
  if (sourceDigest !== writtenDigest) {
    fail("the delivered copy does not match the artwork (sha256 mismatch)");
  }

  console.log(`delivered ${ARTWORK} (${bytes.length} bytes) to ${targetPath}`);
  console.log(`sha256 ${sourceDigest} — copy verified byte-identical`);
}

try {
  main();
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(message);
  process.exit(1);
}
