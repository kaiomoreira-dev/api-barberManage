/* eslint-disable import/no-extraneous-dependencies */
import express, { NextFunction, Request, Response } from "express";

import "dotenv/config";

import "reflect-metadata";

import cors from "cors";

import "express-async-errors";

import { AppError } from "@shared/errors/AppError";

import "@shared/container";

import { router } from "./routes";

export const app = express();

app.use(express.json());

app.use(
    cors({
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
        optionsSuccessStatus: 204,
    })
);

app.use(router);

app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        if (err instanceof AppError) {
            return response.status(err.statusCode).json({
                message: err.message,
            });
        }
        return response.status(500).json({
            status: "error",
            message: `Internal server - error: ${err.message}`,
        });
    }
);
