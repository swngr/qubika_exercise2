import { test } from './fixtures';
import { expect } from '@playwright/test';
import { setCreatedUser, getCreatedUser } from '../specs/sharedStated';

test.describe('End to End workflow', () => {
    const baseURL = 'https://api.club-administration.qa.qubika.com';
    const uiBaseURL = 'https://club-administration.qa.qubika.com/#';
    const adminEmail = "test.qubika@qubika.com";
    const adminPassword = "12345678";
    
    //Step1        
    test('should create a new user successfully (via API)', async ({ createdUser }) => {
        //expect(createdUser.email).toMatch(/sng07\d+@grr\.la/);
        expect(createdUser.email).toMatch("sng09@grr.la");
        console.log('New user created:', createdUser.email);

        // Access the payload from the shared state
        const payload = getCreatedUser()?.payload;
        if (payload) {
            expect(payload).toHaveProperty('email');
            console.log('Payload details:', payload);
        }
    });

    //Step 2
    //Step 3
    test('Should validate Login Page', async ({page}) => {
        await page.goto(`${uiBaseURL}/auth/login`);
        await expect(page).toHaveURL(`${uiBaseURL}/auth/login`);
        await expect(page.getByPlaceholder('Usuario o correo electrónico')).toBeVisible()
        await expect(page.getByPlaceholder('Contraseña')).toBeVisible()
        await expect(page.getByRole('button', { name: /Autenticar/ })).toBeVisible()
    })       

    //Step 4
    test('should log in with the newly created user successfully (via UI)', async ({ page, createdUser }) => {
        await page.goto('https://club-administration.qa.qubika.com/#');
        // Log in with the created user
        await page.getByPlaceholder('Usuario o correo electrónico').fill(createdUser.email);
        await page.getByPlaceholder('Contraseña').fill(createdUser.password);
        await page.getByRole('button', { name: /Autenticar/ }).click();
        // Wait for navigation or a specific element indicating successful login
        await page.waitForSelector("//*[@class='navbar-nav']//a[contains(@href,'dashboard')]");
        // Verify login success
        await expect(page.getByText('Dashboard')).toBeVisible()
        console.log(`Login successful for user: ${createdUser.email}`);
    });

})

