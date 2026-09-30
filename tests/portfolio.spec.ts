import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = [
  ["/", "Kushagra Pandey"],
  ["/experience/", "Infrastructure support in an enterprise environment."],
  ["/cloud/", "A transition with visible evidence and clear next steps."],
  ["/work/", "Infrastructure learning and software engineering, shown in context."],
  ["/work/mediconnect/", "MediConnect"],
  ["/work/riverflow/", "Riverflow"],
  ["/work/ytguide/", "YTGuide"],
  ["/labs/linux-learning/", "Linux Learning Tracker"],
  ["/about/", "Software foundation. Infrastructure reality. Cloud direction."],
  ["/resume/", "Kushagra Pandey"],
] as const;

for (const [path, heading] of routes) {
  test(`${path} renders cleanly and passes automated accessibility checks`, async ({ page }) => {
    const runtimeErrors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") runtimeErrors.push(message.text());
    });
    page.on("pageerror", (error) => runtimeErrors.push(error.message));

    const response = await page.goto(path);
    expect(response?.ok()).toBeTruthy();
    await expect(page.getByRole("heading", { level: 1, name: heading })).toBeVisible();
    await expect(page.locator("h1")).toHaveCount(1);

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    expect(hasHorizontalOverflow).toBeFalsy();

    const accessibility = await new AxeBuilder({ page }).analyze();
    expect(accessibility.violations, JSON.stringify(accessibility.violations, null, 2)).toEqual([]);
    expect(runtimeErrors).toEqual([]);
  });
}

test("desktop navigation identifies the current section", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chromium", "Desktop-only navigation test");
  await page.goto("/cloud/");
  const current = page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: "Cloud Journey" });
  await expect(current).toHaveAttribute("aria-current", "page");
  await current.press("Tab");
});

test("theme toggle changes and persists the selected theme", async ({ page }) => {
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Toggle color theme" });
  const initial = await page.locator("html").getAttribute("data-theme");
  await toggle.click();
  const next = initial === "light" ? "dark" : "light";
  await expect(page.locator("html")).toHaveAttribute("data-theme", next);
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", next);
});

test("skip link moves keyboard focus to the main content target", async ({ page }) => {
  await page.goto("/");
  await page.locator("body").click({ position: { x: 1, y: 1 } });
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
});

test("mobile navigation opens, closes with Escape and closes after navigation", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile-chromium", "Mobile-only navigation test");
  await page.goto("/");
  const menuButton = page.getByRole("button", { name: "Menu" });
  await menuButton.click();
  await expect(menuButton).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(menuButton).toHaveAttribute("aria-expanded", "false");
  await expect(menuButton).toBeFocused();

  await menuButton.click();
  await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "Experience" }).click();
  await expect(page).toHaveURL(/\/experience\/?$/);
  await expect(page.getByRole("button", { name: "Menu" })).toHaveAttribute("aria-expanded", "false");
});

test("external links expose safe new-tab behavior", async ({ page }) => {
  await page.goto("/");
  const externalLinks = page.locator('a[target="_blank"]');
  const count = await externalLinks.count();
  expect(count).toBeGreaterThan(0);
  for (let index = 0; index < count; index += 1) {
    const link = externalLinks.nth(index);
    await expect(link).toHaveAttribute("rel", /noopener/);
    await expect(link).toHaveAttribute("rel", /noreferrer/);
    await expect(link.locator(".sr-only")).toContainText("opens in a new tab");
  }
});

test("custom static 404 page is generated", async ({ page }) => {
  const response = await page.goto("/404.html");
  expect(response?.ok()).toBeTruthy();
  await expect(page.getByRole("heading", { level: 1, name: "This node is not in the topology." })).toBeVisible();
});
