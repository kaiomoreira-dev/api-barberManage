/* eslint-disable import/export */
import { AppError } from "@shared/errors/AppError";
import "dotenv/config";

import mongoose, { Connection } from "mongoose";

export default async function connectionMongoDB(): Promise<Connection> {
    try {
        const url =
            process.env.NODE_ENV === "test"
                ? process.env.MONGODB_URL_DBTEST
                : process.env.MONGODB_URL_BARBERMANAGE;

        await mongoose.connect(url);

        const { connection } = mongoose;

        connection.on("open", () => {
            console.log("Conectado ao MongoDB com sucesso!");
        });

        return connection;
    } catch (error) {
        console.log(error.message);
        throw new AppError("Erro ao conectar ao MongoDB");
    }
}

connectionMongoDB();
