import { test, expect } from "@playwright/test";

test.describe("test core functionality of quartex", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://demo.quartexcollections.com/");
  });

  test("basic search", async ({ page }) => {
    /*
    GIVEN user is on any page of the Quartex Published Site
    WHEN user enters valid <Search term> in the basic search input box
    AND the search button is clicked
    THEN user is navigated to the Browse All page
    AND the first page of search results is displayed
    AND the <Asset listed> meets the search criteria
    */

    const TEST_DATA = {
      SEARCH_TERM: "Brown",
      ASSET_LISTED: "1 April 1875. Browning, Robert to Pollock, Lady.",
    };

    await page.getByTestId("toggleSearchButton").click();
    await page.getByTestId("mastheadSearch").fill(TEST_DATA.SEARCH_TERM);
    await page.getByRole("button", { name: "Apply Search" }).click();

    /* Assumption made here that the expected result is always on page 1
    If this was not the case the test will need to assert page number and
    then check each page for the expected result. */
    await expect(
      page.getByText(TEST_DATA.ASSET_LISTED, { exact: true }),
      `searching for: "${TEST_DATA.SEARCH_TERM}" did not return the expected result: "${TEST_DATA.ASSET_LISTED}"`
    ).toBeVisible();
  });

  test("navigate to link from timeline content block", async ({ page }) => {
    /*
    GIVEN user is on any page of the Quartex Published Site
    AND user has navigated to a <Timeline content block >
    WHEN user navigates to a <Timeline item>
    AND user clicks a <Link>available on the <Timeline item>
    THEN the correct <webpage is launched> in a new tab
    */

    const TEST_DATA = {
      TIMELINE_CONTENT_BLOCK:
        "https://demo.quartexcollections.com/discovery-aids/the-brownings-a-brief-history",
      TIMELINE_ITEM: "1845",
      LINK_TEXT: "one of their first love letters",
      EXPECTED_URL:
        "https://demo.quartexcollections.com/Documents/Detail/10-january-1845.-browning-robert-to-browning-elizabeth-barrett./36113",
    };

    await page.goto(TEST_DATA.TIMELINE_CONTENT_BLOCK);

    const timelineHeading = page.getByRole("heading", {
      name: TEST_DATA.TIMELINE_ITEM,
    });

    /* scroll until the correct heading is added to dom and visible
    this could be a reusable helper function. however I don't need to reuse it so I
    have kept it here for now
    if the element does not get found the test will time out */

    while (!(await timelineHeading.isVisible())) {
      await page.mouse.wheel(0, 500);
    }

    await page
      .getByRole("link", { name: TEST_DATA.LINK_TEXT, exact: true })
      .click();

    // assert new tab opened with correct link
    const newTab = await page.waitForEvent("popup");
    await expect(newTab).toHaveURL(TEST_DATA.EXPECTED_URL);
  });

  test("browse by collection", async ({ page }) => {
    /* 
    GIVEN user is viewing the Browse by collection Name A-Z content block
    WHEN user selects a <Letter> to browse
    THEN the page is scrolled to display all collections starting with the chosen <Letter>
    AND the expected <Collection> is displayed
    */

    const TEST_DATA = {
      LETTER: "W",
      COLLECTION: "War & Conflict",
    };

    await page
      .getByTestId("site-main-menu")
      .getByRole("link", { name: "Explore the Collections" })
      .click();

    // this is necessary because the test was trying to click the button before
    // the page was fully loaded in firefox
    await page.waitForLoadState("load");

    // playwrights autoscrolling should automatically bring the button into view
    await page
      .getByLabel(`Letter ${TEST_DATA.LETTER} link`)
      .getByText(TEST_DATA.LETTER)
      .click();

    // assert header and content are in the viewport
    await expect(
      page.getByRole("heading", { name: TEST_DATA.LETTER, exact: true })
    ).toBeInViewport();
    await expect(
      page.getByRole("link", { name: TEST_DATA.COLLECTION })
    ).toBeInViewport();
  });
});
