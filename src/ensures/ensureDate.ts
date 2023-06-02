export const ensureDate = (date: Date) => {
    const dateRegex =
        /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.(\d{3})Z$/;

    if (dateRegex.test(String(date))) {
        return true;
    }
    return false;
};
