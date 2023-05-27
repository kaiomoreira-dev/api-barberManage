import { Router } from "express";

import { companysRoutes } from "./companys.routes";
import { servicesRoutes } from "./services.routes";
import { usersRoutes } from "./users.routes";

export const router = Router();

router.use("/api/users", usersRoutes);
router.use("/api/companys", companysRoutes);
router.use("/api/services", servicesRoutes);
