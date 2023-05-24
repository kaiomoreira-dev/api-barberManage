export const ensureName = (name: string) => {
    const nameRegex = /^.{0,3}$/;
    return nameRegex.test(name);
};
