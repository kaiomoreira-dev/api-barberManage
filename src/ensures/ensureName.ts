export const ensureName = (name: string) => {
    if (!name) {
        return true;
    }

    const nameRegex = /^.{0,3}$/;

    if (nameRegex.test(name)) {
        return false;
    }
    return true;
};
