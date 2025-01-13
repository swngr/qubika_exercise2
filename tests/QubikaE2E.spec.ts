import { test, expect } from '@playwright/test';
import axios from 'axios';

test.describe('Qubika Sports Club Management Workflow', () => {
    const baseURL = 'https://api.club-administration.qa.qubika.com';
    const swaggerDocsURL = `${baseURL}/swagger-ui/index.html#/`;
    const uiBaseURL = 'https://club-administration.qa.qubika.com/#';

    let userCredentials = {
        email: 'test.qubika@qubika.com',
        password: '123456785',
    };

    let token: string;

    test.beforeAll(async () => {
        // Create a new user via API
        const response = await axios.post(`${baseURL}/users`, {
            email: userCredentials.email,
            password: userCredentials.password,
        });

        expect(response.status).toBe(201);
        console.log('User created successfully:', response.data);

        // Save token for future authenticated requests
        token = response.data.token;
    });

    test('End-to-End Workflow Test', async ({ page }) => {
        // Step 1: Go to the login page and validate its correctness
        await page.goto(`${uiBaseURL}/auth/login`);
        await expect(page).toHaveURL(`${uiBaseURL}/auth/login`);
        await expect(page.locator('text=Login')).toBeVisible();

        // Step 2: Log in with the user credentials
        await page.fill('input[name="email"]', userCredentials.email);
        await page.fill('input[name="password"]', userCredentials.password);
        await page.click('button:has-text("Login")');

        // Validate successful login
        await expect(page.locator('text=Dashboard')).toBeVisible();
        console.log('User logged in successfully.');

        // Step 3: Navigate to Category page
        await page.click('text=Categories');
        await expect(page).toHaveURL(`${uiBaseURL}/categories`);
        console.log('Navigated to Categories page.');

        // Step 4: Create a new category
        const newCategoryName = 'TestCategory';
        await page.click('button:has-text("Add Category")');
        await page.fill('input[name="categoryName"]', newCategoryName);
        await page.click('button:has-text("Save")');

        // Validate new category creation
        const categoryLocator = page.locator(`text=${newCategoryName}`);
        await expect(categoryLocator).toBeVisible();
        console.log('Category created successfully:', newCategoryName);

        // Step 5: Create a subcategory
        const newSubCategoryName = 'TestSubCategory';
        await categoryLocator.click();
        await page.click('button:has-text("Add Subcategory")');
        await page.fill('input[name="subcategoryName"]', newSubCategoryName);
        await page.click('button:has-text("Save")');

        // Validate new subcategory creation
        const subCategoryLocator = page.locator(`text=${newSubCategoryName}`);
        await expect(subCategoryLocator).toBeVisible();
        console.log('Subcategory created successfully:', newSubCategoryName);
    });
}); 