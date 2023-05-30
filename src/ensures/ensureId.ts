/* eslint-disable no-useless-escape */
export const ensureId = (id: string) => {
    if (!id) {
        return true;
    }

    const idRegex = /^[0-9a-f]{24}$/;

    return idRegex.test(id);
};
