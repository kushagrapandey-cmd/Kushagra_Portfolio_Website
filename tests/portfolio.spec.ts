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
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
});

test("mobile navigation opens, closes with Escape and closes after navigation", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile-chromium", "Mobile-only navigation test");
  await page.goto("/");
  const menuButton = page.locator(".menu-button");
  await expect(menuButton).toHaveAccessibleName("Menu");
  await menuButton.click();
  await expect(menuButton).toHaveAttribute("aria-expanded", "true");
  await expect(menuButton).toHaveAccessibleName("Close");
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

test("LinkedIn links use the current profile URL", async ({ page }) => {
  await page.goto("/");
  const links = page.locator('a[href="https://www.linkedin.com/in/kushagra-pandey-353b71175"]');
  expect(await links.count()).toBeGreaterThan(0);
});

test("contact form submits through the portfolio API and stays on the page", async ({ page }) => {
  await page.route("**/api/contact", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true }),
    });
  });

  await page.goto("/");
  await page.getByLabel("Name").fill("Test Visitor");
  await page.getByLabel("Email").fill("test@example.com");
  await page.getByLabel("Short message").fill("Testing the contact form.");
  await page.getByRole("button", { name: "Send message" }).click();

  await expect(page.getByRole("status")).toContainText("Message sent successfully");
  await expect(page).toHaveURL(/\/$/);
});

test("contact form surfaces API failures without navigating away", async ({ page }) => {
  await page.route("**/api/contact", async (route) => {
    await route.fulfill({
      status: 503,
      contentType: "application/json",
      body: JSON.stringify({
        success: false,
        message: "Email delivery is not configured yet. Please use the email link for now.",
      }),
    });
  });

  await page.goto("/");
  await page.getByLabel("Name").fill("Test Visitor");
  await page.getByLabel("Email").fill("test@example.com");
  await page.getByLabel("Short message").fill("Testing the failure state.");
  await page.getByRole("button", { name: "Send message" }).click();

  await expect(page.locator(".form-status-error")).toContainText("Email delivery is not configured yet");
  await expect(page).toHaveURL(/\/$/);
});

test("custom 404 page handles unknown routes", async ({ page }) => {
  const response = await page.goto("/definitely-not-a-real-route/");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1, name: "This node is not in the topology." })).toBeVisible();
});

test("contact rejects blank content and preserves the visitor's draft", async ({ page }) => {
  let submissions = 0;
  await page.route("**/api/contact", async (route) => {
    submissions += 1;
    await route.fulfill({ json: { success: true } });
  });
  await page.goto("/");
  await page.getByLabel("Name", { exact: true }).fill("   ");
  await page.getByLabel("Email address").fill("visitor@example.com");
  await page.getByLabel("Short message").fill("Keep this draft");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.locator(".contact-form").getByRole("alert")).toContainText("Please enter");
  await expect(page.getByLabel("Short message")).toHaveValue("Keep this draft");
  expect(submissions).toBe(0);
});

test("contact retries retain the draft and reuse the delivery identifier", async ({ page }) => {
  const requests: Array<{ requestId: string; message: string }> = [];
  await page.route("**/api/contact", async (route) => {
    requests.push(route.request().postDataJSON());
    await route.fulfill({ status: 502, json: { success: false, message: "Please try again." } });
  });
  await page.goto("/");
  await page.getByLabel("Name", { exact: true }).fill("Test Visitor");
  await page.getByLabel("Email address").fill("visitor@example.com");
  await page.getByLabel("Short message").fill("Hello & thanks\nPlease reply.");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.locator(".contact-form").getByRole("alert")).toContainText("Please try again");
  await expect(page.getByLabel("Short message")).toHaveValue("Hello & thanks\nPlease reply.");
  const fallback = await page.getByRole("link", { name: "Open email app" }).getAttribute("href");
  expect(new URL(fallback!).searchParams.get("body")).toContain("Hello & thanks\nPlease reply.");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect.poll(() => requests.length).toBe(2);
  expect(requests[0].requestId).toBe(requests[1].requestId);
  await page.getByLabel("Short message").fill("A different message");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect.poll(() => requests.length).toBe(3);
  expect(requests[2].requestId).not.toBe(requests[0].requestId);
});

test("contact prevents duplicate submits and freezes fields until completion", async ({ page }) => {
  let submissions = 0;
  let complete!: () => void;
  const pending = new Promise<void>((resolve) => { complete = resolve; });
  await page.route("**/api/contact", async (route) => {
    submissions += 1;
    await pending;
    await route.fulfill({ json: { success: true } });
  });
  await page.goto("/");
  await page.getByLabel("Name", { exact: true }).fill("Test Visitor");
  await page.getByLabel("Email address").fill("visitor@example.com");
  await page.getByLabel("Short message").fill("One message");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByRole("button", { name: "Sending" })).toBeDisabled();
  await expect(page.getByLabel("Short message")).toHaveAttribute("readonly", "");
  await page.locator(".contact-form").evaluate((form) => {
    form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
  });
  complete();
  await expect(page.getByRole("status")).toContainText("Message sent successfully");
  expect(submissions).toBe(1);
  await expect(page.getByLabel("Short message")).toHaveValue("");
});

test("resume PDF downloads as a real PDF", async ({ page, request }) => {
  await page.goto("/resume/");
  const link = page.getByRole("link", { name: "Download resume PDF" });
  const href = await link.getAttribute("href");
  const response = await request.get(href!);
  expect(response.ok()).toBeTruthy();
  expect((await response.body()).subarray(0, 5).toString()).toBe("%PDF-");
  const downloading = page.waitForEvent("download");
  await link.click();
  expect((await downloading).suggestedFilename()).toBe("Kushagra_Pandey_Resume.pdf");
});

test("contact API rejects malformed and overlong submissions without crashing", async ({ request }) => {
  for (const body of [null, [], "invalid", { name: "Visitor", email: "wrong", message: "Hi" }, { name: "Visitor", email: "test@example.com", message: "a".repeat(701) }]) {
    const response = await request.post("/api/contact", { data: JSON.stringify(body), headers: { "Content-Type": "application/json" } });
    expect(response.status()).toBe(400);
    expect((await response.json()).success).toBe(false);
  }
});

test("contact honeypot accepts bot input without delivering email", async ({ request }) => {
  const response = await request.post("/api/contact", { data: { website: "a".repeat(250) } });
  expect(response.status()).toBe(200);
  expect((await response.json()).success).toBe(true);
});

test("theme still toggles when local storage is blocked", async ({ page }) => {
  await page.addInitScript(() => {
    Storage.prototype.setItem = () => { throw new DOMException("Blocked", "SecurityError"); };
  });
  await page.goto("/");
  const initial = await page.locator("html").getAttribute("data-theme");
  await page.getByRole("button", { name: "Toggle color theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", initial === "light" ? "dark" : "light");
});

test("narrow phones keep the case study and resume inside the viewport", async ({ page }) => {
  for (const width of [320, 360]) {
    await page.setViewportSize({ width, height: 800 });
    for (const path of ["/work/mediconnect/", "/resume/"]) {
      await page.goto(path);
      await page.evaluate(() => document.fonts.ready);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${path} at ${width}px`).toBe(true);
    }
  }
});
