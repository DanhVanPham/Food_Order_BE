import { NextFunction, Request, Response } from "express";

const AsyncHandler =
	(fn: (req: Request, res: Response, next: NextFunction) => any) =>
	(req: Request, res: Response, next: NextFunction) => {
		fn(req, res, next).catch(next);
	};

export { AsyncHandler };
