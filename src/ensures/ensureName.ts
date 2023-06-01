export const ensureName = (name: string) => {
    const nameRegex = /^.{0,3}$/;

    if (nameRegex.test(name)) {
        return false;
    }
    return true;
};
