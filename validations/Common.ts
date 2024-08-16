import { param } from "express-validator";
import mongoose from "mongoose";

export const ValidationObjectId = () => {
	return [
		param("id")
			.custom((value) => {
				return mongoose.Types.ObjectId.isValid(value);
			})
			.withMessage("Id is invalid"),
	];
};
