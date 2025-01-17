import { test } from './fixtures';
import { expect } from '@playwright/test';
import { getCreatedUser } from '../specs/sharedStated';

test.describe('End to End workflow', () => {
    const uiBaseURL = 'https://club-administration.qa.qubika.com/#';
    
    // Step 1) Create a new user through API and save the user information. Find Qubika Sports Club Management System        
    test('should create a new user successfully (via API)', async ({ createdUser }) => {
        expect(createdUser.email).toMatch("sng11@grr.la");
        console.log('New user created:', createdUser.email);

        // Access the payload from the shared state
        const payload = getCreatedUser()?.payload;
        if (payload) {
            expect(payload).toHaveProperty('email');
            console.log('Payload details:', payload);
        }
    });

    test('Should validate Login Page', async ({page}) => {

        //Step 2) Go to Qubika Sports Club Management System
        await page.goto(`${uiBaseURL}/auth/login`);

        //Step 3) Validate that the login page is displayed correctly
        await expect(page).toHaveURL(`${uiBaseURL}/auth/login`);
        await expect(page.getByPlaceholder('Usuario o correo electrónico')).toBeVisible()
        await expect(page.getByPlaceholder('Contraseña')).toBeVisible()
        await expect(page.getByRole('button', { name: /Autenticar/ })).toBeVisible()
    })       

    test('Should log in (via UI) with the newly created user and created categories and subcategories', async ({ page, createdUser }) => {
        await page.goto('https://club-administration.qa.qubika.com/#');
        
        // Step 4) Log in with the created user
        await page.getByPlaceholder('Usuario o correo electrónico').fill(createdUser.email);
        await page.getByPlaceholder('Contraseña').fill(createdUser.password);
        await page.getByRole('button', { name: /Autenticar/ }).click();
        // Wait for navigation or a specific element indicating successful login
        await page.waitForSelector("//*[@class='navbar-nav']//a[contains(@href,'dashboard')]");
        
        // Step 5) Validate that the user is logged in
        await expect(page.getByText('Dashboard')).toBeVisible()
        //console.log(`Login successful for user: ${createdUser.email}`);

        const category_type = page.locator("xpath=//*[@class='navbar-nav']//a[contains(@href,'category')]")

        // Step 6a) Navigate to Category page
        await category_type.click();        
        const lastPage = page.locator("xpath=//*[contains(@class,'pagination')]//*[contains(@class,'page-item ng-star-inserted')]").last()
        await lastPage.scrollIntoViewIfNeeded();
        await page.waitForTimeout(1500);
        await lastPage.click()

        // Step 6b) Create a new category and validate that the category was created successfully
        const addButton = page.getByRole('button', { name: /Adicionar/ })
        
        await lastPage.last().scrollIntoViewIfNeeded();
        await page.waitForTimeout(1500);
        await addButton.click(); 
        await page.getByPlaceholder('Nombre de categoría').click();
         const mainCat_name = "sng_Cat";   
        await page.getByPlaceholder('Nombre de categoría').fill(mainCat_name);
        await page.getByRole('button', { name: /Aceptar/ }).click();

        const windowPopup = page.getByText("adicionada satisfactoriamente");
        await expect(windowPopup).toBeVisible();

        // Step 6c) Create a sub category and validate it is displayed in the Categories list.
        await addButton.scrollIntoViewIfNeeded();
        await addButton.click(); 
        await page.getByPlaceholder('Nombre de categoría').click();
        const subCat_name = "sng_SubCat";   
        await page.getByPlaceholder('Nombre de categoría').fill(subCat_name);
        await page.locator("//input[@type='checkbox']").setChecked(true, {force: true});
        const list_cat_padre = page.getByRole("combobox")
        await list_cat_padre.dblclick()
        await page.keyboard.press('s');
        await page.keyboard.press('n');
        await page.keyboard.press('g');
        await page.keyboard.press('_');
        await page.keyboard.press('C');
        await page.keyboard.press('a');
        await page.keyboard.press('t');
        await page.waitForTimeout(1500);

        await page.keyboard.press('Enter');
        await page.locator("//button[@type='submit']").click();
        const lastRow = page.locator("xpath=//tr").last()
        await expect(lastRow).toContainText(mainCat_name)
        await expect(lastRow).toContainText(subCat_name)

    });

})

