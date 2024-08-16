import { NextFunction, Request, Response } from "express";
import { AuthPayload } from "../dto/Auth.dto";
import { ValidateSignature } from "../utility";
import { AuthFailureError } from "../core/error.response";

declare global {
	namespace Express {
		interface Request {
			user?: AuthPayload;
		}
	}
}

export const Authenticate = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const validate = await ValidateSignature(request);

	if (!validate) {
		const errorRes = new AuthFailureError();
		return response.status(errorRes.status).json({
			status: "error",
			code: errorRes.status,
			message: errorRes.message,
		});
	}

	next();
};
