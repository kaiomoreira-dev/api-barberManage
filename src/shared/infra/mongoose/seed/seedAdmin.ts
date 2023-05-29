import { hash } from "bcrypt";

import { AppError } from "@shared/errors/AppError";

import connectionMongoDB from "..";

async function seedAdmin() {
    try {
        const connection = await connectionMongoDB();

        const password = await hash(process.env.USER_PASSWORD, 8);

        await connection.collection("users").insertOne({
            name: "User Admin",
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
        throw new AppError("Error while creating admin user");
    }
}

seedAdmin();
