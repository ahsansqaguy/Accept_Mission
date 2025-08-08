# Playwright Test Automation

This repository contains Playwright-based test automation scripts. Follow the steps below to set up and execute the tests.

---

## Steps to Run the Tests

1. **Download the ZIP File**
   - Click the **Code** button in the repository.
   - Select **Download ZIP**.
   - Save the file to your desired location.

2. **Unzip the File**
   - Locate the downloaded ZIP file.
   - Extract the contents to a folder of your choice.

3. **Install Dependencies**
   - Open a terminal and navigate to the extracted folder.
   - Run the following command to install the required dependencies:
     ```bash
     npm install
     ```

4. **Install Playwright Browsers**
   - Run the following command to install the Playwright browsers:
     ```bash
     npx playwright install
     ```

5. **Run the Tests**
   - Execute the following command to run the tests:
     ```bash
     npx playwright test
     ```

---

## Prerequisites

- Make sure **Node.js** is installed on your system. If not, download and install it from [Node.js Official Website](https://nodejs.org/).
- Set up a `.env` file in the root directory with the necessary environment variables required by the tests.

---

## Troubleshooting

- If you encounter issues during setup or execution, ensure all dependencies are installed correctly and the `.env` file is properly configured.
- Run the tests in debug mode to identify issues:
  ```bash
  npx playwright test --debug
