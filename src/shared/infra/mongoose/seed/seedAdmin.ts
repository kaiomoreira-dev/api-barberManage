import { hash } from "bcrypt";

import { AppError } from "@shared/errors/AppError";

import connectionMongoDB from "..";

async function seedAdmin() {
    try {
        const connection = await connectionMongoDB();

        const password = await hash(process.env.USER_PASSWORD, 8);

        await connection.collection("users").insertOne({
            name: "Luis Douglas Ramos Maria",
            email: process.env.USER_EMAIL,
            password,
            phone: "",
            address: "",
            admin: true,
            employee: true,
        });

        console.log("Created admin user successfully");

        await connection.close();
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

seedAdmin();
