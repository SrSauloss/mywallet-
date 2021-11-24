import express from "express";
import * as userController from "./controllers/user.controller.js";
import * as financeController from "./controllers/finance.controller.js";
const routes = express.Router();

routes.post("/sign-up", userController.storeUser);
routes.post("/sign-in", userController.getUser);
routes.post("/financial-events", financeController.storeFinance);
routes.get("/financial-events", financeController.listFinances);
routes.get("/financial-events/sum", financeController.getSum);
export default routes;
