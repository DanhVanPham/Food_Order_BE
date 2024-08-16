import {
	BadRequestError,
	ConflictRequestError,
	NotFoundError,
} from "../core/error.response";
import { CreateVandorInput } from "../dto";
import { Vandor } from "../models";
import { GeneratePassword, GenerateSalt } from "../utility";
import { FindVandor } from "./VandorService";

export const CreateVandor = async (data: CreateVandorInput) => {
	const {
		name,
		address,
		email,
		foodType,
		ownerName,
		password,
		phone,
		pincode,
	} = data;

	const existingVandor = await FindVandor({ email });

	// Generate salt
	const salt = await GenerateSalt();

	// encrypt the password using the salt
	const hashPassword = await GeneratePassword(password, salt);

	if (existingVandor) {
		throw new ConflictRequestError("Vandor is exist with this email ID");
	}

	const createVandor = await Vandor.create({
		name,
		address,
		pincode,
		foodType,
		email,
		password: hashPassword,
		salt,
		ownerName,
		phone,
		rating: 0,
		serviceAvailable: false,
		coverImages: [],
	});

	return createVandor;
};

export const GetVandors = async () => {
	return await Vandor.find();
};

export const GetVandorByID = async (id: string) => {
	const foundVandor = await FindVandor({ id });

	if (!foundVandor) {
		throw new NotFoundError(`Vandor not found with this id: ${id}`);
	}

	return foundVandor;
};
