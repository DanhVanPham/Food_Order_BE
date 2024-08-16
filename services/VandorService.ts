import { BadRequestError, NotFoundError } from "../core/error.response";
import { VandorEditInput, VandorLoginInput } from "../dto";
import { AuthPayload } from "../dto/Auth.dto";
import { CreateFoodInput } from "../dto/Food.dto";
import { Vandor, VandorDoc } from "../models";
import { Food } from "../models/Food";
import { GenerateSignature, ValidatePassword } from "../utility";

export const FindVandor = async ({
	id,
	email,
}: {
	id?: string;
	email?: string;
}) => {
	if (email) return await Vandor.findOne({ email });

	if (id) return await Vandor.findById(id);
};

export const VandorLogin = async (data: VandorLoginInput) => {
	const { email, password } = data;

	const foundVandor = await FindVandor({ email });
	if (!foundVandor)
		throw new BadRequestError("Login credentials is not valid");

	const isMatched = await ValidatePassword(
		foundVandor.password,
		password,
		foundVandor.salt
	);
	if (!isMatched) throw new BadRequestError("Login credentials is not valid");

	return {
		accessToken: generateToken(foundVandor),
		vandor: foundVandor,
	};
};

export const UpdateVandorProfile = async (
	data: VandorEditInput,
	user: AuthPayload
) => {
	const { address, foodType, name, phone } = data;
	const existingVandor = await FindVandor({ id: user._id });
	if (!existingVandor) throw new NotFoundError("Vandor is not found");

	existingVandor.name = name;
	existingVandor.address = address;
	existingVandor.phone = phone;
	existingVandor.foodType = foodType;

	existingVandor.save();

	return existingVandor;
};

export const UpdateVandorService = async (user: AuthPayload) => {
	const existingVandor = await FindVandor({ id: user._id });
	if (!existingVandor) throw new NotFoundError("Vandor is not found");

	existingVandor.serviceAvailable = !existingVandor.serviceAvailable;

	existingVandor.save();

	return existingVandor;
};

export const AddFood = async (data: CreateFoodInput, user: AuthPayload) => {
	const existingVandor = await FindVandor({ id: user._id });
	if (!existingVandor) throw new NotFoundError("Vandor is not found");

	const { category, description, foodType, name, price, readyTime } = data;

	const createdFood = await Food.create({
		name,
		description,
		foodType,
		category,
		price,
		readyTime,
		rating: 0,
		vandorId: existingVandor._id,
	});

	existingVandor.foods.push(createdFood._id);
	existingVandor.save();

	return existingVandor;
};

const generateToken = (vandor: VandorDoc) => {
	return GenerateSignature({
		_id: String(vandor._id),
		email: vandor.email,
		name: vandor.name,
		foodType: vandor.foodType,
	});
};
