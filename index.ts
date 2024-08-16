import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose, { ConnectOptions } from "mongoose";
import { PORT } from "./config/constants";
import routes from "./routes";
import { MONGO_URI } from "./config";
import { ErrorResponse } from "./core/error.response";

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1", routes);

mongoose
	.connect(MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	} as ConnectOptions)
	.then((result) => {
		console.log("Connected to database");
	})
	.catch((error) => console.log(error));

// handle error
app.use((req, res, next) => {
	const error = new ErrorResponse("Not Found", 404);
	next(error);
});

app.use(
	(error: ErrorResponse, req: Request, res: Response, next: NextFunction) => {
		const statusCode = error.status || 500;
		return res.status(statusCode).json({
			status: "error",
			code: statusCode,
			message: error.message || "Internal Server Error",
		});
	}
);

app.listen(PORT, () => {
	console.clear();
	console.log(`Server listening port: ${PORT}`);
});
