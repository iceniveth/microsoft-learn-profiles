import { chromium, Page } from "playwright";

const browser = await chromium.launch({
  headless: false,
});

try {
  const context = await browser.newContext();
  const page = await context.newPage();

  const profileLinks = [
    "https://learn.microsoft.com/en-us/users/ayeshadaniellesiroy-4510/",
    "https://learn.microsoft.com/en-us/users/elycisjasa-3575/",
    "https://learn.microsoft.com/en-us/users/mayolivares-6259/",
    "https://learn.microsoft.com/en-us/users/sachikogubat-9415/",
    "https://learn.microsoft.com/en-us/users/teofyrabanes-5675/",
    "https://learn.microsoft.com/en-us/users/kentan-0805/",
    "https://learn.microsoft.com/en-us/users/markjescemmangalay-7586/",
  ];

  let profiles = [];

  for (const profileLink of profileLinks) {
    profiles.push(await extractProfile(page, profileLink));
  }

  console.log(JSON.stringify(profiles, null, 2));
} finally {
  await browser.close();
}

async function extractProfile(page: Page, profileLink: string) {
  await page.goto(profileLink);

  await page.waitForResponse((response) =>
    response.url().includes("https://learn.microsoft.com/api/profiles/")
  );

  const [name] = await page.locator(".hero-content h1").allTextContents();

  await page.waitForResponse((response) =>
    response
      .url()
      .includes("https://learn.microsoft.com/api/achievements/user/")
  );

  const modulesNodes = await page.locator("#modules-section ol li .card").all();

  const modules = await Promise.all(
    modulesNodes.map(async (module) => {
      const titleText = await module
        .locator(".card-content-title")
        .textContent();

      const completedAtText = await module
        .locator(".card-content-metadata time")
        .textContent();

      return {
        title: titleText?.replaceAll("\t", "").replaceAll("\n", "").trim(),
        completedAt: completedAtText.trim(),
      };
    })
  );

  return {
    name,
    modules,
  };
}
