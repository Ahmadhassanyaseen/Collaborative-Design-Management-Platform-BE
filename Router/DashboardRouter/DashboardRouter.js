import { Router } from "express";
import DashboardController from "../../Controller/DashboardController/DashboardController.js";

const router = Router();

router.get('/stats', DashboardController.getStats);


export default router;
