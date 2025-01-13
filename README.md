# Overview #

This project automates the end-to-end workflow of the Qubika Sports Club Management System. It covers API and UI automation using Playwright for UI interactions and Axios for API requests. The test validates user creation, login functionality, category creation, and subcategory creation.

### Prerequisites ###

Node.js: Ensure you have Node.js installed (v16+ recommended).
Playwright: Install Playwright via npm.
Axios: For API calls, Axios is included as a dependency.

Dependencies: Ensure you have installed the required dependencies by running npm install.

### Installation ### 

1) Clone the repository:

```git clone https://github.com/swngr/qubika_exercise2 ```

``` cd <your-repository-folder> ```

2) Install dependencies:

```npm install```

### How to Run the Test ### 

Run the test file using the Playwright test runner:

```npx playwright test```

###  Test Workflow ###  

#### API Steps ####

Create User: A new user is created using the Qubika API, and a token is retrieved for authentication.

#### UI Steps ####

1) Login Validation: Navigates to the login page and verifies its correctness.

2) User Login: Logs in with the created user credentials.

3) Category Page Navigation: Accesses the category management page.

4) Category Creation: Adds a new category and verifies its creation.

5) Subcategory Creation: Adds a subcategory under the created category and validates its presence.

#### Files and Structure ####

##### Test Script: ##### 
The main automation script is located in tests/qubika-e2e.spec.ts.

##### Dependencies: #####

1) Playwright: Handles browser automation.

2) Axios: Manages API requests.
