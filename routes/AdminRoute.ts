import express, { NextFunction, Request, Response } from "express";
import { CreateVandor } from "../controllers/AdminController";

const router = express.Router();

router.post("/vandor", CreateVandor);

router.get("/", (request: Request, response: Response, next: NextFunction) => {
	response.json({ message: "Hello from Admin Route" });
});

export { router as AdminRoute };
