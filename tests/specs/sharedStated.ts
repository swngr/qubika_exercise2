interface CreatedUser {
    email: string;
    password: string;
    name: string;
    role: string;
    payload?: any;
}

let testCreatedUser: CreatedUser | null = null;

export const setCreatedUser = (user: CreatedUser) => {
    testCreatedUser = user;
};

export const getCreatedUser = (): CreatedUser | null => {
    return testCreatedUser;
};