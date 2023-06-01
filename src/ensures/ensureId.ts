/* eslint-disable no-useless-escape */
export const ensureId = (id: string) => {
    const idRegex = /^[a-fA-F0-9]{24}$/;

    return idRegex.test(id);
};
