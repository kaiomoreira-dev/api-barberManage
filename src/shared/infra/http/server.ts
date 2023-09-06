import createConnection from "@shared/infra/mongoose/index";
import "reflect-metadata";

import { app } from "./app";

createConnection();

app.listen(3000, '0.0.0.0', () => {
    console.log("Server listening on port 3200");
});
