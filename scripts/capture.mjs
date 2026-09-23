import { chromium } from "playwright-core";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const output = path.join(root, "screenshots");
await mkdir(output, { recursive: true });

const browser = await chromium.launch({
  executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  headless: true,
  args: ["--use-angle=swiftshader", "--enable-webgl", "--ignore-gpu-blocklist"],
});

async function waitForMuseum(page) {
  await page.goto("http://127.0.0.1:3100", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Enter the museum" }).waitFor({ state: "visible", timeout: 20000 });
  await page.waitForTimeout(600);
}

const desktop = await browser.newPage({ viewport: { width: 1440, height: 960 }, deviceScaleFactor: 1 });
await waitForMuseum(desktop);
await desktop.screenshot({ path: path.join(output, "desktop-01-opening.png") });
await desktop.getByRole("button", { name: "Enter the museum" }).click();
await desktop.waitForTimeout(2600);
await desktop.screenshot({ path: path.join(output, "desktop-02-entrance.png") });
await desktop.getByRole("button", { name: "Continue along the museum path" }).click();
await desktop.waitForTimeout(1300);
await desktop.screenshot({ path: path.join(output, "desktop-03-through-arch.png") });
await desktop.waitForTimeout(1500);
await desktop.getByRole("button", { name: "Continue along the museum path" }).click();
await desktop.waitForTimeout(2500);
await desktop.getByRole("button", { name: "Continue along the museum path" }).click();
await desktop.getByRole("heading", { name: "The Idea That Almost Worked" }).waitFor({ state: "visible" });
await desktop.waitForTimeout(2600);
await desktop.screenshot({ path: path.join(output, "desktop-04-exhibit-before.png") });
await desktop.getByRole("button", { name: "Complete the idea." }).click();
await desktop.waitForTimeout(1800);
await desktop.screenshot({ path: path.join(output, "desktop-05-exhibit-active.png") });

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
await waitForMuseum(mobile);
await mobile.getByRole("button", { name: "Enter the museum" }).click();
await mobile.waitForTimeout(2600);
await mobile.screenshot({ path: path.join(output, "mobile-01-entrance.png") });
await mobile.keyboard.press("ArrowDown");
await mobile.waitForTimeout(2600);
await mobile.keyboard.press("ArrowDown");
await mobile.waitForTimeout(2600);
await mobile.keyboard.press("ArrowDown");
await mobile.getByRole("heading", { name: "The Idea That Almost Worked" }).waitFor({ state: "visible" });
await mobile.waitForTimeout(2600);
await mobile.screenshot({ path: path.join(output, "mobile-02-exhibit.png"), timeout: 60000 });

await browser.close();
