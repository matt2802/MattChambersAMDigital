import { test } from "@playwright/test";

test.describe("test core functionality of quartex", async () => {
  test.skip("basic search", async () => {
    /*
    GIVEN user is on any page of the Quartex Published Site
    WHEN user enters valid <Search term> in the basic search input box
    AND the search button is clicked
    THEN user is navigated to the Browse All page
    AND the first page of search results is displayed
    AND the <Asset listed> meets the search criteria
    */
  });

  test.skip("navigate to link from timeline content block", async () => {
    /*
    GIVEN user is on any page of the Quartex Published Site
    AND user has navigated to a <Timeline content block >
    WHEN user navigates to a <Timeline item>
    AND user clicks a <Link>available on the <Timeline item>
    THEN the correct <webpage is launched> in a new tab
    */
  });

  test.skip("browse by collection", async () => {
    /* 
    GIVEN user is viewing the Browse by collection Name A-Z content block
    WHEN user selects a <Letter> to browse
    THEN the page is scrolled to display all collections starting with the chosen <Letter>
    AND the expected <Collection> is displayed
    */
  });
});
