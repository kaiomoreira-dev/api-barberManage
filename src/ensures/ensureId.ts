/* eslint-disable no-useless-escape */
export const ensureId = (id: string) => {
    const idRegex = /^[0-9a-f]{24}$/;

    if (idRegex.test(id)) {
        return false;
    }
    return true;
};
