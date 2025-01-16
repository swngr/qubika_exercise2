export function generateRandomEmail(): string {
    const timestamp = Date.now();
    return `user${timestamp}@example.com`;
}