import { test as base } from '@playwright/test';
import { APIClient } from '../core/APIClient';
import { generateRandomEmail } from '../utilities/GenerateEmail';
import { setCreatedUser, getCreatedUser } from '../specs/sharedStated';


export const test = base.extend<{
    apiClient: APIClient;
    createdUser: { email: string; password: string; name: string; role: string };
}>({
    apiClient: async ({ request }, use) => {
        const client = new APIClient('https://api.club-administration.qa.qubika.com', request);
        // Log in with fixed admin credentials to get a token
        const adminEmail = 'test.qubika@qubika.com';
        const adminPassword = '12345678';
        const { token, payload } = await client.login(adminEmail, adminPassword);
        console.log('Admin login response payload:', payload); // Log admin login payload
        if (!token) {
            throw new Error('Admin login failed. Cannot obtain token.');
        }
        await use(client);
    },

    createdUser: async ({ apiClient }, use) => {
        // Check if a user already exists
        let user = getCreatedUser();
        if (!user) {
            user = {
                //email: generateRandomEmail(),
                email: "sng11@grr.la",
                password: "Password123",
                name: "New User",
                role: "member",
            };
            const { success, payload } = await apiClient.registerUser(user);
            console.log('User registration response payload:', payload); // Log registration payload
            if (!success) {
                throw new Error('Failed to create the user.');
            }
            setCreatedUser(user); // Store the user in shared state
        }
        await use(user); // Pass the user to tests
    },
});