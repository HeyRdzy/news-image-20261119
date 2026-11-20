// News image entry (Node 22, standard library only). The repository holds the
// finished picture, entry.png, and this program puts a copy of it at
// /output/entry.png for the grader. It runs with no network.
//
// The output directory is a mount point where the grader runs it, so this
// program never removes that directory itself: it only clears what is inside
// it, creates it when it is missing, and then copies the image in. Deleting
// the directory would fail on the mount point and the run would exit 1.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const repoDir = new URL('.', import.meta.url).pathname;

if (existsSync(outDir)) {
  for (const child of readdirSync(outDir)) {
    rmSync(join(outDir, child), { recursive: true, force: true });
  }
} else {
  mkdirSync(outDir, { recursive: true });
}

copyFileSync(join(repoDir, 'entry.png'), join(outDir, 'entry.png'));
