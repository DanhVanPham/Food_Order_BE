import express from "express";
import { AdminRoute } from "./AdminRoute";
import { VandorRoute } from "./VandorRoute";
import { ValidateHandler } from "../middlewares";

const routes = express.Router();

// routes.use(ValidateHandler);

routes.use("/admin", AdminRoute);

routes.use("/vandor", VandorRoute);

export default routes;
