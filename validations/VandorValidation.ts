import { body, check } from "express-validator";

export const validateVandorLogin = () => {
	return [
		body("email")
			.not()
			.isEmpty()
			.withMessage("Email does not empty")
			.isEmail()
			.withMessage("Email is invalid"),
		check("password", "Password more than 6 degits").isLength({
			min: 6,
		}),
	];
};

export const validateVandorEdit = () => {
	return [
		check("name", "Name does not empty").not().isEmpty(),
		body("phone")
			.not()
			.isEmpty()
			.withMessage("Phone does not Empty")
			.isMobilePhone("vi-VN")
			.withMessage("Invalid phone number"),
	];
};
