export const ensurePassword = (password: string) => {
    const passwordRegex = /^.{0,5}$/;
    return passwordRegex.test(password);
};
