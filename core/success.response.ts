import { Response } from "express";
import { ReasonPhases, StatusCodes } from "../utility/HttpStatusCode";

class SuccessResponse {
	message: string;
	status: number;
	metadata: object;

	constructor({
		message,
		statusCode = StatusCodes.OK,
		reasonStatusCode = ReasonPhases.OK,
		metaData = {},
	}: {
		message?: string;
		statusCode?: number;
		reasonStatusCode?: string;
		metaData?: object;
	}) {
		this.message = !message ? reasonStatusCode : message;
		this.status = statusCode;
		this.metadata = metaData;
	}

	send(res: Response, headers = {}) {
		return res.status(this.status).json(this);
	}
}

class OK extends SuccessResponse {
	constructor({
		message,
		metaData = {},
	}: {
		message: string;
		metaData: object;
	}) {
		super({ message, metaData });
	}
}

class CREATED extends SuccessResponse {
	constructor({
		message,
		statusCode = StatusCodes.CREATED,
		reasonStatusCode = ReasonPhases.CREATED,
		metaData = {},
	}: {
		message: string;
		statusCode?: number;
		reasonStatusCode?: string;
		metaData: object;
	}) {
		super({ message, statusCode, reasonStatusCode, metaData });
	}
}

export { OK, CREATED, SuccessResponse };
