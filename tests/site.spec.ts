import {
  expect,
  test,
  type Page,
  type Route,
  type TestInfo,
} from "@playwright/test";

const previewURL = "https://api.officeandcloud.com/applications";
const signInURL = "https://app.officeandcloud.com/?signin=1";
const responseHeaders = {
  "access-control-allow-origin": "*",
  "content-type": "application/json",
};
const pillars = [
  ["discovery", "Discovery", "Keep an accountable register."],
  ["governance", "Governance", "Set the rules for AI use."],
  ["risk-security", "Risk & Security", "Make risk reviewable."],
  ["ai-economics", "AI Economics", "Account for AI spend."],
  ["performance-value", "Performance & Value", "Review continued use."],
] as const;

async function mockPreview(
  page: Page,
  handler: (route: Route) => Promise<void>,
) {
  await page.route(previewURL, async (route) => {
    if (route.request().method() === "OPTIONS") {
      await route.fulfill({
        status: 204,
        headers: {
          "access-control-allow-origin": "*",
          "access-control-allow-methods": "POST, OPTIONS",
          "access-control-allow-headers": "content-type",
        },
      });
      return;
    }
    await handler(route);
  });
}

test.beforeEach(async ({ page }) => {
  // Fail closed: no test can submit to the production API, even after a URL typo.
  await page.route("https://api.officeandcloud.com/**", (route) =>
    route.abort("blockedbyclient"),
  );
  await mockPreview(page, (route) =>
    route.fulfill({
      status: 503,
      headers: responseHeaders,
      body: JSON.stringify({
        error: "Preview submission is disabled in browser tests.",
      }),
    }),
  );
});

async function expectNoHorizontalOverflow(page: Page) {
  await expect
    .poll(() =>
      page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      ),
    )
    .toBeLessThanOrEqual(1);
}

async function openExplorer(page: Page) {
  await page.goto("/#platform");
  const scene = page.getByRole("img", {
    name: /Five architectural layers represent/,
  });
  await scene.scrollIntoViewIfNeeded();
  // The full accessible fallback is valid for functional tests. A dedicated test
  // below requires a real, rendered WebGL canvas and never accepts that fallback.
  await expect(page.locator("[data-scene-ready]")).toHaveAttribute(
    "data-scene-ready",
    "true",
    { timeout: 35_000 },
  );
  return scene;
}

async function screenshot(
  page: Page,
  info: TestInfo,
  name: string,
  fullPage = false,
) {
  if (fullPage) {
    await page.evaluate(() => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    });
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  }
  const path = info.outputPath(`${name}.png`);
  await page.screenshot({ path, fullPage, animations: "disabled" });
  await info.attach(name, { path, contentType: "image/png" });
}

async function fillPreview(page: Page) {
  await page.getByLabel("Your name", { exact: true }).fill("CI Preview Test");
  await page
    .getByLabel("Work email", { exact: true })
    .fill("ci-preview@example.invalid");
  await page.getByLabel("Organization", { exact: true }).fill("Synthetic CI");
}

test("renders the production page, preserves mobile sign-in, and captures the design", async ({
  page,
}, info) => {
  const pageErrors: string[] = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Your AI workforce.",
  );
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "contractors.",
  );
  const heroImage = page.locator("#top picture img");
  await expect
    .poll(() =>
      heroImage.evaluate((image) => (image as HTMLImageElement).naturalWidth),
    )
    .toBeGreaterThan(0);
  await page.evaluate(() => document.fonts.ready.then(() => true));
  await expect(page.locator("#platform-heading")).toHaveText(
    /One AI workforce\.\s*Five layers of oversight\./,
  );
  const platformSupport = page.locator("#supported-platforms");
  await expect(platformSupport).toHaveAttribute(
    "aria-label",
    "Device agent platform support",
  );
  await expect(
    platformSupport.getByText("Windows", { exact: true }),
  ).toBeVisible();
  await expect(platformSupport.getByText(/macOS\s*Beta/)).toBeVisible();
  await expect(platformSupport.getByText(/Linux\s*Beta/)).toBeVisible();
  await expect
    .poll(
      () =>
        page.locator("[data-hero-artwork]").evaluate((artwork) => {
          const support = document.getElementById("supported-platforms");
          return support
            ? artwork.getBoundingClientRect().bottom -
                support.getBoundingClientRect().top
            : -1;
        }),
      {
        message:
          "Hero artwork should overlap the device platform strip by at least 12px.",
      },
    )
    .toBeGreaterThanOrEqual(12);

  const signIn = page
    .getByRole("navigation", { name: "Main navigation", exact: true })
    .getByRole("link", { name: "Sign in", exact: true });
  await expect(signIn).toBeVisible();
  await expect(signIn).toBeInViewport();
  await expect(signIn).toHaveAttribute("href", signInURL);
  await expectNoHorizontalOverflow(page);
  await screenshot(page, info, "hero");

  if ((page.viewportSize()?.width ?? 1440) < 700) {
    await page.getByRole("button", { name: "Open menu", exact: true }).click();
    const mobileNav = page.getByRole("navigation", {
      name: "Mobile navigation",
      exact: true,
    });
    await expect(mobileNav).toBeVisible();
    await expect(signIn).toBeVisible();
    await expectNoHorizontalOverflow(page);
    await page.keyboard.press("Escape");
    await expect(mobileNav).toHaveCount(0);
    await expect(
      page.getByRole("button", { name: "Open menu", exact: true }),
    ).toBeFocused();
  }

  await page
    .getByRole("link", { name: "Explore the platform", exact: true })
    .click();
  const scene = page.getByRole("img", {
    name: /Five architectural layers represent/,
  });
  await scene.scrollIntoViewIfNeeded();
  await expect(page.locator("[data-scene-ready]")).toHaveAttribute(
    "data-scene-ready",
    "true",
    { timeout: 35_000 },
  );
  const explorerPath = info.outputPath("explorer.png");
  await page
    .locator("#platform")
    .screenshot({ path: explorerPath, animations: "disabled" });
  await info.attach("explorer", {
    path: explorerPath,
    contentType: "image/png",
  });
  await screenshot(page, info, "full-page", true);
  await expectNoHorizontalOverflow(page);
  expect(pageErrors).toEqual([]);
});

test("the five pillars change one AI record and keep a single scene", async ({
  page,
}) => {
  const scene = await openExplorer(page);
  const originalScene = await scene.elementHandle();
  const originalCanvas = (await scene.locator("canvas").count())
    ? await scene.locator("canvas").elementHandle()
    : null;
  const navigation = page.getByRole("navigation", {
    name: "Explore the five pillars",
    exact: true,
  });
  await expect(navigation.getByRole("button")).toHaveCount(5);

  for (const [id, name, heading] of pillars) {
    const button = page.locator(`#pillar-${id}`);
    await button.click();
    await expect(button).toHaveAttribute("aria-pressed", "true");
    await expect(navigation.locator('[aria-pressed="true"]')).toHaveCount(1);
    await expect(
      page.locator("#pillar-evidence").getByRole("heading"),
    ).toHaveText(heading);
    await expect(
      page
        .locator("#platform")
        .getByText("Customer Success AI", { exact: true }),
    ).toHaveCount(1);
    await expect(
      page
        .locator("#platform")
        .getByText("Customer Success lead", { exact: true }),
    ).toHaveCount(1);
    await expect(scene).toHaveAttribute(
      "aria-label",
      new RegExp(`${name} is selected\\.`),
    );
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    expect(
      await originalScene?.evaluate((element) => element.isConnected),
    ).toBe(true);
    expect(await page.locator("canvas").count()).toBeLessThanOrEqual(1);
    if (originalCanvas)
      expect(
        await originalCanvas.evaluate((element) => element.isConnected),
      ).toBe(true);
  }

  await page.locator("#pillar-performance-value").press("Home");
  await expect(page.locator("#pillar-discovery")).toBeFocused();
  await page.locator("#pillar-discovery").press("ArrowRight");
  await expect(page.locator("#pillar-governance")).toBeFocused();
  await expect(page.locator("#pillar-governance")).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await page
    .getByRole("button", { name: "Why this matters", exact: true })
    .click();
  await expect(page.locator("#pillar-context")).toBeVisible();
  await page.locator("#pillar-discovery").click();
  await expect(page.locator("#pillar-context")).toHaveCount(0);
});

test("deep links select a pillar and repeated lower links scroll back to it", async ({
  page,
}) => {
  await page.goto("/#risk-security");
  await expect(page.locator("#pillar-risk-security")).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await expect(
    page.locator("#pillar-evidence").getByRole("heading"),
  ).toHaveText("Make risk reviewable.");
  const economicsLink = page.getByRole("link", {
    name: "Explore AI economics",
    exact: true,
  });
  for (let visit = 0; visit < 2; visit += 1) {
    await economicsLink.scrollIntoViewIfNeeded();
    await economicsLink.click();
    await expect(page).toHaveURL(/#ai-economics$/);
    await expect(page.locator("#pillar-ai-economics")).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await expect
      .poll(() =>
        page.locator("#platform").evaluate((element) => {
          const top = element.getBoundingClientRect().top;
          return top >= 0 && top <= 125;
        }),
      )
      .toBe(true);
  }
});

test("motion can be paused, persists, and respects reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await openExplorer(page);
  await page
    .getByRole("button", { name: "Pause scene motion", exact: true })
    .click();
  await expect(
    page.locator('[data-motion="on"], [data-motion="off"]'),
  ).toHaveAttribute("data-motion", "off");
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Play scene motion", exact: true }),
  ).toHaveAttribute("aria-pressed", "false");
  await page
    .getByRole("button", { name: "Play scene motion", exact: true })
    .click();
  await expect(
    page.locator('[data-motion="on"], [data-motion="off"]'),
  ).toHaveAttribute("data-motion", "on");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(
    page.getByRole("button", {
      name: "Motion disabled by your reduced-motion preference",
      exact: true,
    }),
  ).toBeDisabled();
  await expect(
    page.locator('[data-motion="on"], [data-motion="off"]'),
  ).toHaveAttribute("data-motion", "off");
  await page.locator("#pillar-governance").click();
  await expect(
    page.locator("#pillar-evidence").getByRole("heading"),
  ).toHaveText("Set the rules for AI use.");
});

test("privacy and terms resolve as static routes with working skip targets", async ({
  page,
}) => {
  for (const [route, title] of [
    ["/privacy/", "Privacy Notice"],
    ["/terms/", "Preview Terms"],
  ]) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(
      page.getByRole("heading", { level: 1, name: title, exact: true }),
    ).toBeVisible();
    await expect(page.locator("main#main-content")).toHaveCount(1);
    await expect(
      page.getByRole("link", { name: "Skip to content", exact: true }),
    ).toHaveAttribute("href", "#main-content");
    await expect(page.locator('a[href="/"]').first()).toBeVisible();
    await expectNoHorizontalOverflow(page);
  }
});

test("preview success requires accepted true and suppresses duplicate submissions", async ({
  page,
}) => {
  const submissions: Array<{
    method: string;
    url: string;
    body: Record<string, unknown>;
    contentType: string | undefined;
  }> = [];
  let releaseResponse!: () => void;
  const responseGate = new Promise<void>((resolve) => {
    releaseResponse = resolve;
  });
  await mockPreview(page, async (route) => {
    const request = route.request();
    submissions.push({
      method: request.method(),
      url: request.url(),
      body: request.postDataJSON(),
      contentType: request.headers()["content-type"],
    });
    await responseGate;
    await route.fulfill({
      status: 200,
      headers: responseHeaders,
      body: JSON.stringify({ accepted: true }),
    });
  });
  const openedAt = Date.now();
  await page.goto("/#preview");
  await fillPreview(page);
  const form = page.locator("#preview form");
  try {
    // Native requestSubmit exercises two submissions in the same browser turn,
    // before a disabled button alone could protect the in-flight request.
    await form.evaluate((element) => {
      (element as HTMLFormElement).requestSubmit();
      (element as HTMLFormElement).requestSubmit();
    });
    await expect.poll(() => submissions.length).toBe(1);
    await expect(form).toHaveAttribute("aria-busy", "true");
    await expect(
      form.getByRole("button", { name: "Sending…", exact: true }),
    ).toBeDisabled();
    await form.evaluate((element) =>
      (element as HTMLFormElement).requestSubmit(),
    );
    releaseResponse();
    await expect(
      form.getByRole("button", { name: "Request received", exact: true }),
    ).toBeDisabled();
    await expect(form.getByRole("status")).toContainText(
      "confirmation that we received your request",
    );
    expect(submissions).toHaveLength(1);
    expect(submissions[0]).toMatchObject({
      method: "POST",
      url: previewURL,
      contentType: "application/json",
    });
    expect(submissions[0].body).toEqual({
      name: "CI Preview Test",
      email: "ci-preview@example.invalid",
      organization: "Synthetic CI",
      website: "",
      startedAt: expect.any(Number),
    });
    expect(submissions[0].body.startedAt).toBeGreaterThanOrEqual(openedAt);
    expect(submissions[0].body.startedAt).toBeLessThanOrEqual(Date.now());
    await expect(form.getByRole("alert")).toHaveCount(0);
    await expectNoHorizontalOverflow(page);
  } finally {
    releaseResponse();
  }
});

test("preview validates input and remains retryable after rejected or failed responses", async ({
  page,
}) => {
  const genericError = "Your request could not be submitted. Please try again.";
  const responses = [
    {
      status: 200,
      body: JSON.stringify({
        accepted: false,
        error: "The request was not accepted.",
      }),
      error: "The request was not accepted.",
    },
    {
      status: 200,
      body: JSON.stringify({ accepted: "true" }),
      error: genericError,
    },
    {
      status: 503,
      body: JSON.stringify({
        accepted: true,
        error: "Please try again later.",
      }),
      error: "Please try again later.",
    },
    { status: 200, body: "invalid JSON", error: genericError },
    { status: 0, body: "", error: genericError },
  ];
  let requestCount = 0;
  await mockPreview(page, async (route) => {
    const response = responses[requestCount++];
    if (!response || response.status === 0) await route.abort("failed");
    else
      await route.fulfill({
        status: response.status,
        headers: responseHeaders,
        body: response.body,
      });
  });
  await page.goto("/#preview");
  const form = page.locator("#preview form");
  const submit = form.getByRole("button", {
    name: "Request preview access",
    exact: true,
  });
  await expect(submit).toBeEnabled();
  await submit.click();
  expect(
    await form.evaluate((element) =>
      (element as HTMLFormElement).checkValidity(),
    ),
  ).toBe(false);
  expect(requestCount).toBe(0);
  await fillPreview(page);
  await page.getByLabel("Work email", { exact: true }).fill("not-an-email");
  await submit.click();
  expect(
    await page
      .getByLabel("Work email", { exact: true })
      .evaluate(
        (element) => (element as HTMLInputElement).validity.typeMismatch,
      ),
  ).toBe(true);
  expect(requestCount).toBe(0);
  await page
    .getByLabel("Work email", { exact: true })
    .fill("ci-preview@example.invalid");

  for (const [index, response] of responses.entries()) {
    await submit.click();
    await expect.poll(() => requestCount).toBe(index + 1);
    await expect(form.getByRole("alert")).toHaveText(response.error);
    await expect(submit).toBeEnabled();
    await expect(form).toHaveAttribute("aria-busy", "false");
    await expect(form.getByRole("status")).toBeEmpty();
    await expect(page.getByLabel("Your name", { exact: true })).toHaveValue(
      "CI Preview Test",
    );
  }
});

test("the WebGL headquarters actually renders and changes when a pillar is selected", async ({
  page,
}, info) => {
  test.skip(
    info.project.name !== "desktop",
    "One dedicated desktop software-WebGL rendering gate; functional tests cover both mobile widths.",
  );
  test.setTimeout(90_000);
  const consoleErrors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => consoleErrors.push(error.message));
  const scene = await openExplorer(page);
  try {
    await expect(scene).toHaveAttribute("data-ready", "true", {
      timeout: 40_000,
    });
    const canvas = scene.locator("canvas");
    await expect(canvas).toHaveCount(1);
    expect(
      await canvas.evaluate((element) => (element as HTMLCanvasElement).width),
    ).toBeGreaterThan(100);
    const discovery = await canvas.screenshot({ animations: "disabled" });
    await page.locator("#pillar-risk-security").click();
    await expect(scene).toHaveAttribute(
      "aria-label",
      /Risk & Security is selected\./,
    );
    // Compare only the canvas: a changed HTML label or fallback cannot pass this.
    await expect
      .poll(
        async () =>
          !discovery.equals(
            await canvas.screenshot({ animations: "disabled" }),
          ),
        { timeout: 15_000 },
      )
      .toBe(true);
    const path = info.outputPath("headquarters-webgl.png");
    await scene.screenshot({ path, animations: "disabled" });
    await info.attach("headquarters-webgl", { path, contentType: "image/png" });
    expect(
      consoleErrors,
      "The scene must render without shader or runtime errors",
    ).toEqual([]);
  } finally {
    const renderer = await page.evaluate(() => {
      const sceneElement = document.querySelector('[role="img"][data-ready]');
      const canvas = sceneElement?.querySelector("canvas");
      const gl = canvas?.getContext("webgl2");
      const debug = gl?.getExtension("WEBGL_debug_renderer_info");
      return {
        ready: sceneElement?.getAttribute("data-ready"),
        canvasCount: document.querySelectorAll("canvas").length,
        version: gl?.getParameter(gl.VERSION),
        renderer:
          gl && debug ? gl.getParameter(debug.UNMASKED_RENDERER_WEBGL) : null,
      };
    });
    await info.attach("webgl-diagnostics", {
      body: JSON.stringify({ ...renderer, consoleErrors }, null, 2),
      contentType: "application/json",
    });
  }
});
