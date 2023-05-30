/* eslint-disable no-useless-escape */
export const ensurePrice = (price: number) => {
    if (typeof price === "number" && price < 0) {
        return false;
    }

    return true;
};
