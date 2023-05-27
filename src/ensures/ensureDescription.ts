/* eslint-disable no-useless-escape */
export const ensureDecription = (description: string) => {
    if (!description) {
        return true;
    }

    const descriptionRegex = /^[\w\s.,!?-]*$/;

    return descriptionRegex.test(description);
};
