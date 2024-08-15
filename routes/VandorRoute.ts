import express, { NextFunction, Request, Response } from "express";

const router = express.Router();

router.get("/", (request: Request, response: Response, next: NextFunction) => {
	response.json({ message: "Hello from VandorRoute" });
});

export { router as VandorRoute };
