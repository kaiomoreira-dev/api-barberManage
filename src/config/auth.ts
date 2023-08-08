import "dotenv/config";

export default {
    secretToken: JSON.parse(process.env.SECRET_TOKEN),
    expireInToken: JSON.parse(process.env.EXPIRE_IN_TOKEN),
    secretRefreshToken: JSON.parse(process.env.SECRET_REFRESH_TOKEN),
    expireRefreshToken: JSON.parse(process.env.EXPIRE_REFRESH_TOKEN),
    daysRefreshToken: Number(process.env.DAYS_REFRESH_TOKEN),
};
