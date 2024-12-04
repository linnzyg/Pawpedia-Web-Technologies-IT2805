export const getUsername = (): string | null => {
    const username = localStorage.getItem('username');
    return username;
};

export const setUsername = (username: string): void => {
    localStorage.setItem('username', username);
};
