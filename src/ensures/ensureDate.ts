export const ensureDate = (date: Date) => {
    const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;
    if (dateRegex.test(String(date))) {
        return false;
    }
    return true;
};
