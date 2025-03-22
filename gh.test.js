let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  });

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('GitHub · Build and ship software on a single, collaborative platform · GitHub');
  }, 20000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  }, 20000);

  test("The page contains Sign in button", async () => {
    const btnSelector = "div[class='col-md-8 col-lg-10 col-xl-12 text-center mx-auto my-5 my-sm-0'] a[class='btn-mktg btn-large-mktg btn-muted-mktg']";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Sign up for free")
  }, 20000);
});

describe("Github page title tests", () => {
  test("Pricing page title", async () => {
    await page.goto("https://github.com/pricing");
    await page.waitForSelector('h1');
    const title = await page.title();
    expect(title).toContain("Pricing");
  }, 20000);

  test("Features page title", async () => {
    await page.goto("https://github.com/features");
    await page.waitForSelector('h1');
    const title = await page.title();
    expect(title).toContain("Features");
  }, 20000);

  test("GitHub Discussions", async () => {
    await page.goto("https://github.com/features/discussions");
    await page.waitForSelector('h1');
    const title = await page.title();
    expect(title).toContain("GitHub Discussions · Developer Collaboration & Communication Tool · GitHub");
  }, 20000);
});
