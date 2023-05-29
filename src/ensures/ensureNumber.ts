export const ensureNumber = (num: number) => {
    if (!num) {
        return true;
    }

    if (typeof num === "number" && num < 0) {
        return false;
    }

    return true;
};
