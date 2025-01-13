# Overview #

This project automates the end-to-end workflow of the Qubika Sports Club Management System. It covers API and UI automation using Playwright for UI interactions and Axios for API requests. The test validates user creation, login functionality, category creation, and subcategory creation..

### Prerequisites ###

* RatScorpion 
* Version
* [repo](https://bitbucket.org/youngliving/rattscorpion-automation/src/master_qa_rs/)
* Branch:** 'master_qa_rs'

### How do I get set up? ###

* Step 1: Install Node.js
    Visit the Node.js download page: Node.js Download
    Follow the installation instructions for your operating system.
* Step 2: Install Visual Studio Code
   Install Visual Studio Code following the instructions provided for your operating system.
* Step 3: Install SourceTree/Alternative any tool to manage your repo
    Install SourceTree by downloading it from SourceTree's website.
* Step 4: Clone the project. Use the repo link provided 
    above and makesure to have mobile and Desktop folders
* Step 5:  Install Cypress
    Install Cypress by running the following command:
    npm install cypress@13.3.0 (latest)
* Step 6: Install Cypress Dependencies In the terminal window, navigate to your project directory (Desktop or Mobile) and run: npm install
* Run some tests for example on Desktop:
    go to terminal and run this command 
    npm run test:clone;
### Contribution guidelines ###
for Desktop:
"test:chrome_clone_headless": This script runs the Cypress tests in headless mode (without opening the browser UI) specifically in the Chrome browser. It uses the configuration file clone.config.js and only runs the test files specified after --spec.
"test:chrome_clone_non_headless": This script opens the Cypress Test Runner for you to see the tests running in the Chrome browser. It uses the configuration file clone.config.js and only runs the test files specified after --spec.
"allure_open": This script generates an Allure report from the test results in the allure-results directory and opens it in the default browser.
"allure_open_port": this script will use a specific port to open allure reports on local machine
### Contribution guidelines ###

* Writing tests
* Code review
* Other guidelines

### Who do I talk to? ###

* Repo owner or admin - Cesar De La Piedra

### Allure Reports ###
* Allure reports are generated after running the tests.
* To view the reports, run the script from package.json "allure_open"
