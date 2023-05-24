/* eslint-disable no-useless-escape */
export const ensureAddress = (address: string) => {
    const addressRegex = /^([a-zA-Z\s]+),\s*([a-zA-Z\s]+),\s*(\d+),\s*(\d{8})$/;
    return addressRegex.test(address);
};
