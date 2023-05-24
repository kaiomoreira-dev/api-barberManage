/* eslint-disable no-useless-escape */
export const ensurePhone = (phone: string) => {
    const phoneRegex = /^[0-9]{2}-[0-9]{5}-[0-9]{4}$/;
    return phoneRegex.test(phone);
};
