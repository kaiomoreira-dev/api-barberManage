import { Router } from "express";

import { authenticatesRoutes } from "./authenticate.routes";
import { companysRoutes } from "./companys.routes";
import { costRoutes } from "./costs.routes";
import { servicesRoutes } from "./services.routes";
import { usersRoutes } from "./users.routes";
import { clientsRoutes } from "./clients.routes";

export const router = Router();

router.use("/api/users", usersRoutes);
router.use("/api/companys", companysRoutes);
router.use("/api/services", servicesRoutes);
router.use("/api/costs", costRoutes);
router.use("/api/clients", clientsRoutes);

router.use(authenticatesRoutes);
