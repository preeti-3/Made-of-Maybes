import { chromium } from "playwright-core";
import assert from "node:assert/strict";

const browser = await chromium.launch({
  executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  headless: true,
  args: ["--use-angle=swiftshader", "--enable-webgl", "--ignore-gpu-blocklist"],
});

const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
await page.emulateMedia({ reducedMotion: "reduce" });
await page.goto("http://127.0.0.1:3100", { waitUntil: "networkidle" });
const enter = page.getByRole("button", { name: "Enter the museum" });
await enter.waitFor({ state: "visible", timeout: 20000 });

assert.equal(await page.evaluate(() => document.body.scrollWidth <= window.innerWidth), true, "mobile page must not overflow horizontally");
await page.getByTitle("Motion preference").waitFor({ state: "visible" });
await page.getByRole("button", { name: "Skip to the first exhibit" }).click();
await page.getByRole("heading", { name: "The Idea That Almost Worked" }).waitFor({ state: "visible" });
await page.getByRole("button", { name: "Tap to complete the idea" }).click();
await page.getByText("Some ideas aren’t failures.").waitFor({ state: "visible", timeout: 5000 });

const fallback = await browser.newPage({ viewport: { width: 1024, height: 768 } });
await fallback.addInitScript(() => {
  const original = HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext = function (type, ...args) {
    if (type === "webgl" || type === "webgl2") return null;
    return original.call(this, type, ...args);
  };
});
await fallback.goto("http://127.0.0.1:3100", { waitUntil: "networkidle" });
await fallback.getByRole("heading", { name: "Made of Maybes" }).waitFor({ state: "visible" });
await fallback.getByText("Your browser cannot open the 3D museum").waitFor({ state: "visible" });

console.log("Quality checks passed: reduced motion, 375px layout, semantic interaction, and non-WebGL fallback.");
await browser.close();
