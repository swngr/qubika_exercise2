# Qubika Sports Club Management System - E2E Testing

This repository contains an end-to-end (E2E) testing solution for the Qubika Sports Club Management System using Playwright, TypeScript, and Visual Studio Code (VSCode). The solution includes API interactions, UI validations, and user management workflows.

## Table of Contents

- [Solution Overview](#solution-overview)
- [Enhancements](#enhancements)
- [Setup Instructions](#setup-instructions)
- [Running Tests](#running-tests)
- [Folder Structure](#folder-structure)

## Solution Overview

This E2E solution covers the following functionalities:

1. **User Management:** Create a new user through the API and store the user information for use in subsequent steps.
2. **Login Page Validation:** Verify that the login page displays correctly with all necessary fields and buttons.
3. **User Login and Navigation:** Log in using the created user's credentials, validate successful login, and navigate to the Category page.
4. **Category Management:** Create a new category and validate its creation. Create a subcategory under the new category and verify its appearance in the list.

### Key Files

- `APIClient.ts`: Handles API interactions such as user registration and login.
- `fixtures.ts`: Manages test fixtures, including API client setup and user creation.
- `QubikaE2E.spec.ts`: Contains E2E test cases for the specified functionalities.
- `sharedStated.ts`: Manages shared state between test cases, such as storing created user details.
- `GenerateEmail.ts`: Utility for generating unique email addresses for user registration.

## Enhancements

- **Reusable API Client:** Created a reusable `APIClient` class to abstract API interactions for login and user creation.
- **Shared State Management:** Implemented `sharedStated.ts` to maintain test consistency by reusing the created user data across test cases.
- **Dynamic Email Generation:** Added a utility function (`GenerateEmail.ts`) for generating unique email addresses to avoid conflicts.
- **Comprehensive Validations:** Added detailed UI validations for login page fields and button visibility.
- **Scalable Test Structure:** Organized code into fixtures and test files to ensure scalability and maintainability.

## Setup Instructions

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Set Up Environment:**
   - Update the `APIClient` base URL (`baseUrl`) with the correct API endpoint.
   - Ensure admin credentials (`adminEmail` and `adminPassword`) are valid for API login.

3. **VSCode Extensions:**
   - Install the following VSCode extensions for an optimized experience:
     - Playwright Test Runner
     - TypeScript

## Running Tests

1. **Run All Tests:**
   To execute all test cases:
   ```bash
   npx playwright test
   ```

2. **Run Specific Test File:**
   To execute a specific test file (e.g., `QubikaE2E.spec.ts`):
   ```bash
   npx playwright test QubikaE2E.spec.ts
   ```

3. **Debug Tests:**
   To debug tests interactively:
   ```bash
   npx playwright test --debug
   ```

4. **Generate Test Report:**
   After running the tests, generate an HTML report:
   ```bash
   npx playwright show-report
   ```

## Folder Structure

```plaintext
.
├── core
│   ├── APIClient.ts          # API client for handling API interactions
├── fixtures
│   ├── fixtures.ts           # Test fixtures for setting up dependencies
├── specs
│   ├── QubikaE2E.spec.ts     # Main E2E test file
│   ├── sharedStated.ts       # Shared state management for tests
├── utilities
│   ├── GenerateEmail.ts      # Utility for generating unique email addresses
├── playwright.config.ts      # Playwright configuration file
```

---

Feel free to customize the configuration and extend test cases as per the project requirements. For additional details or troubleshooting, refer to the [Playwright documentation](https://playwright.dev/docs/intro).

