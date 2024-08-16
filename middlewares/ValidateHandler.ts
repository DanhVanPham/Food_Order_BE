import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { BadRequestError } from "../core/error.response";

export const ValidateHandler = (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const errors = validationResult(request);

	if (!errors.isEmpty()) {
		const errorRes = new BadRequestError("Invalid data");
		return response.status(errorRes.status).json({
			status: "error",
			code: errorRes.status,
			message: errorRes.message,
			errors: errors.array(),
		});
	}

	next();
};
