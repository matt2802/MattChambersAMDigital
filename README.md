
# Matthew Chambers

AM Digital Senior Test Engineer Technical Assesment

Email: matt.chambers2802@gmail.com


## Installation

- Clone the repository locally
- Install all project dependencies with npm:

```bash
  npm install
```
Before running tests it may necessary to run the following command to ensure all browsers are installed:
```bash
  npx playwright install  
```

## Running Tests

To run tests, use the following command

```bash
  npm run test
```
## What's included

- Tests will execute across the 3 major browsers (Chromium, Firefox, Webkit)
- Test data is extracted to an object to allow for easily updating test cases
- Linting and type checking will be automatically performed as a pretest step to protect against common errors

## Approach / Considerations

- I aimed to create tests that could easily be adjusted by changing the data within the TEST_DATA object. A natural extension of this would be to feed in the test data externally and support looping through multiple test cases, which would allow the tests to be truly data driven.
- I encountered intermittent slow performance from the demo site during my testing, which caused flakiness. I increased the default expect and test timeouts substantially to 30s and 60s to counteract this.
- The readability and maintainability could be improved by extracting locators and helper functions into a central location such as a page object model. I elected not to do this because of scope considerations and I do not yet have repeated code.
- Care was taken to use locators that conformed to Playwrights best practice recommendations
- Playwright does not completely protect against common playwright code errors (such as un-awaited promises) by default. Therefore I added typescript and eslint as a dev dependency to protect against common code errors.
