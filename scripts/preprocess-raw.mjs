/**
 * Automated FFmpeg media preprocessing pipeline: public/raw/ -> public/assets/clips/
 * - Trims leading/mid/trailing silences (silenceremove)
 * - Normalizes audio loudness to -16 LUFS (Reels / TikTok / Meta Ads standard)
 * - Reformats video to 9:16 vertical (1080x1920, 30 fps, H.264 yuv420p, AAC 48kHz)
 *
 * Usage:
 *   npm run preprocess
 *   FFMPEG_PATH=/custom/path/to/ffmpeg npm run preprocess
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const RAW_DIR = path.resolve("public/raw");
const OUT_DIR = path.resolve("public/assets/clips");
const VIDEO_EXTS = new Set([".mp4", ".mov", ".mkv", ".webm", ".avi", ".m4v"]);

function resolveFfmpeg() {
  if (process.env.FFMPEG_PATH && fs.existsSync(process.env.FFMPEG_PATH)) {
    return process.env.FFMPEG_PATH;
  }
  return "ffmpeg";
}

function main() {
  fs.mkdirSync(RAW_DIR, { recursive: true });
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const files = fs
    .readdirSync(RAW_DIR)
    .filter((f) => VIDEO_EXTS.has(path.extname(f).toLowerCase()));

  if (files.length === 0) {
    console.log("No raw video clips found in public/raw/.");
    console.log("Drop .mp4/.mov clips into public/raw/ and run: npm run preprocess");
    return;
  }

  const ffmpeg = resolveFfmpeg();
  console.log(`Using FFmpeg binary: ${ffmpeg}`);

  for (const file of files) {
    const inputPath = path.join(RAW_DIR, file);
    const baseName = path.basename(file, path.extname(file));
    const outputPath = path.join(OUT_DIR, `${baseName}-9x16.mp4`);

    console.log(`\nProcessing: ${file} -> ${path.relative(process.cwd(), outputPath)}`);

    const vf = [
      "scale=1080:1920:force_original_aspect_ratio=increase",
      "crop=1080:1920",
      "fps=30",
      "format=yuv420p",
    ].join(",");

    const af = [
      "silenceremove=start_periods=1:start_duration=0.15:start_threshold=-38dB:stop_periods=-1:stop_duration=0.35:stop_threshold=-38dB",
      "loudnorm=I=-16:TP=-1.5:LRA=11",
    ].join(",");

    execFileSync(
      ffmpeg,
      [
        "-y",
        "-i",
        inputPath,
        "-vf",
        vf,
        "-af",
        af,
        "-c:v",
        "libx264",
        "-preset",
        "medium",
        "-crf",
        "20",
        "-c:a",
        "aac",
        "-b:a",
        "192k",
        "-ar",
        "48000",
        "-movflags",
        "+faststart",
        outputPath,
      ],
      { stdio: "inherit" }
    );
  }

  console.log("\nDone. Normalized 9:16 clips saved to public/assets/clips/.");
}

main();
