import { APIResponse, APIRequestContext } from 'playwright';

export class APIClient {
    private baseUrl: string;
    private token: string | null = null;
    private requestContext: APIRequestContext;

    constructor(baseUrl: string, requestContext: APIRequestContext) {
        this.baseUrl = baseUrl;
        this.requestContext = requestContext;
    }


    private async parseResponse(response: APIResponse): Promise<any> {
        const contentType = response.headers()['content-type'];

        if (contentType?.includes('application/json')) {
            return await response.json(); // Parse JSON if content-type is JSON
        }

        // If not JSON, log and return raw text
        const rawText = await response.text();
        console.error(`Unexpected response format: ${rawText}`);
        return { error: rawText };
    }

    async login(email: string, password: string): Promise<{ token: string | null; payload: any }> {
        const response: APIResponse = await this.requestContext.post(`${this.baseUrl}/api/auth/login`, {
            data: { email, password },
        });

        const payload = await this.parseResponse(response);

        if (response.ok()) {
            this.token = payload.token;
            return { token: this.token, payload };
        } else {
            console.error(`Login failed: ${response.status()} - ${response.statusText()}`);
            return { token: null, payload };
        }
    }

    async registerUser(userData: Record<string, any>): Promise<{ success: boolean; payload: any }> {
        const response: APIResponse = await this.requestContext.post(`${this.baseUrl}/api/auth/register`, {
            data: userData,
            headers: { Authorization: `Bearer ${this.token}` },
        });

        const payload = await this.parseResponse(response);

        if (response.ok()) {
            return { success: true, payload };
        } else {
            console.error(`Registration failed: ${response.status()} - ${response.statusText()}`);
            return { success: false, payload };
        }
    }
}