let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://github.com/team");
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  test("The h1 header content'", async () => {
    jest.setTimeout(20000);
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('GitHub · Build and ship software on a single, collaborative platform · GitHub');
  });

  test("The first link attribute", async () => {
    jest.setTimeout(10000);
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  });

  test("The page contains Sign in button", async () => {
    jest.setTimeout(10000);
    const btnSelector = "div[class='col-md-8 col-lg-10 col-xl-12 text-center mx-auto my-5 my-sm-0'] a[class='btn-mktg btn-large-mktg btn-muted-mktg']";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Sign up for free")
  });
});

describe("Github page title tests", () => {
  test("Pricing page title", async () => {
    await page.goto("https://github.com/pricing");
    await page.waitForSelector('h1', { timeout: 10000 });
    const title = await page.title();
    expect(title).toContain("Pricing");
  });

  test("Features page title", async () => {
    await page.goto("https://github.com/features");
    await page.waitForSelector('h1', { timeout: 10000 });
    const title = await page.title();
    expect(title).toContain("Features");
  });

  test("GitHub Discussions", async () => {
    jest.setTimeout(10000);
    await page.goto("https://github.com/features/discussions");
    await page.waitForSelector('h1');
    const title = await page.title();
    expect(title).toContain("GitHub Discussions · Developer Collaboration & Communication Tool · GitHub");
  });
});
