import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { VandorPayload } from "../dto";
import { SECRET_KEY } from "../config/constants";
import { Request } from "express";
import { AuthPayload } from "../dto/Auth.dto";

export const GenerateSalt = async () => {
	return await bcrypt.genSalt();
};

export const GeneratePassword = async (password: string, salt: string) => {
	return await bcrypt.hash(password, salt);
};

export const ValidatePassword = async (
	hashPassword: string,
	plainPassword: string,
	salt: string
) => {
	const generatedPass = await GeneratePassword(plainPassword, salt);
	return generatedPass === hashPassword;
};

export const GenerateSignature = (payload: VandorPayload) => {
	return jwt.sign(payload, SECRET_KEY, {
		expiresIn: "1d",
	});
};

export const ValidateSignature = async (request: Request) => {
	const signature = request.get("Authorization");
	if (signature && signature.startsWith("Bearer")) {
		const payload = jwt.verify(
			signature.split(" ")[1],
			SECRET_KEY
		) as AuthPayload;
		request.user = payload;
		return true;
	}

	return false;
};
