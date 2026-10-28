import { expect, test } from "@playwright/test";

test("intro works with the keyboard and projects scroll without page overflow", async ({ page }) => {
  await page.goto("/");
  const intro = page.locator(".quick-intro");
  await intro.locator("summary").focus();
  await page.keyboard.press("Enter");
  await expect(intro).toHaveAttribute("open", "");
  await expect(intro).toContainText("Hi, I'm Kushagra");
  const rail = page.getByRole("region", { name: "Software project showcase" });
  await expect(rail).toBeVisible();
  const before = await rail.evaluate((node) => node.scrollLeft);
  await page.getByRole("button", { name: "Next projects" }).click();
  await expect.poll(() => rail.evaluate((node) => node.scrollLeft)).toBeGreaterThan(before);
  await page.getByRole("button", { name: "Previous projects" }).click();
  await expect.poll(() => rail.evaluate((node) => node.scrollLeft)).toBeLessThan(10);
  const overflow = await page.evaluate(() => ({
    width: innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    elements: [...document.querySelectorAll("body *")].filter((node) => {
      const box = node.getBoundingClientRect();
      return box.right > innerWidth + 1 && !node.closest("#project-rail");
    }).map((node) => ({ tag: node.tagName, class: node.className, right: node.getBoundingClientRect().right })),
  }));
  expect(overflow.scrollWidth, JSON.stringify(overflow)).toBeLessThanOrEqual(overflow.width + 1);
});

test("portfolio is silent and the cursor trail can be disabled", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("button", { name: /sound/i })).toHaveCount(0);
  await page.getByRole("button", { name: "Cursor trail on" }).click();
  await expect(page.getByRole("button", { name: "Cursor trail off" })).toHaveAttribute("aria-pressed", "false");
  await page.mouse.move(120, 120);
  await expect(page.locator(".interaction-layer > span")).toHaveCount(0);
});

test("reduced motion disables particles while keeping navigation usable", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.locator(".hero-eyebrow").click();
  await expect(page.locator(".interaction-layer > span")).toHaveCount(0);
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe("auto");
  await page.getByRole("button", { name: "Next projects" }).click();
  expect(await page.locator("#project-rail").evaluate((node) => node.scrollLeft)).toBeGreaterThan(0);
});
