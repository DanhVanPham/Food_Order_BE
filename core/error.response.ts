import { ReasonPhases, StatusCodes } from "../utility/HttpStatusCode";

class ErrorResponse extends Error {
	status: number;

	constructor(message: string, status: number) {
		super(message);
		this.status = status;
	}
}

class ConflictRequestError extends ErrorResponse {
	constructor(
		message = ReasonPhases.CONFLICT,
		statusCode = StatusCodes.CONFLICT
	) {
		super(message, statusCode);
	}
}

class BadRequestError extends ErrorResponse {
	constructor(
		message = ReasonPhases.BAD_REQUEST,
		statusCode = StatusCodes.BAD_REQUEST
	) {
		super(message, statusCode);
	}
}

class AuthFailureError extends ErrorResponse {
	constructor(
		message = ReasonPhases.UNAUTHORIZED,
		statusCode = StatusCodes.UNAUTHORIZED
	) {
		super(message, statusCode);
	}
}

class NotFoundError extends ErrorResponse {
	constructor(
		message = ReasonPhases.NOT_FOUND,
		statusCode = StatusCodes.NOT_FOUND
	) {
		super(message, statusCode);
	}
}

class InternalServerError extends ErrorResponse {
	constructor(
		message = ReasonPhases.INTERNAL_SERVER_ERROR,
		statusCode = StatusCodes.INTERNAL_SERVER_ERROR
	) {
		super(message, statusCode);
	}
}

export {
	ErrorResponse,
	ConflictRequestError,
	BadRequestError,
	AuthFailureError,
	NotFoundError,
	InternalServerError,
};
