import { body, check } from "express-validator";
import { Vandor } from "../models";

export const validateCreateVandor = () => {
	return [
		check("name", "Name does not empty").not().isEmpty(),
		check("ownerName", "Owner name does not empty").not().isEmpty(),
		check("pincode", "Pincode does not empty").not().isEmpty(),
		check("password", "Password more than 6 degits").isLength({
			min: 6,
		}),
		body("phone")
			.not()
			.isEmpty()
			.withMessage("Phone does not Empty")
			.isMobilePhone("vi-VN")
			.withMessage("Invalid phone number"),
		body("email")
			.not()
			.isEmpty()
			.withMessage("Email does not Empty")
			.isEmail()
			.withMessage("Invalid email")
			.custom((value, { req }) => {
				return Vandor.findOne({ email: value }).then((vandorDoc) => {
					if (vandorDoc) {
						return Promise.reject("Email already exists!");
					}
				});
			}),
	];
};
