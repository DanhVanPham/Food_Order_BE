import { Request, Response } from "express";
import { VandorEditInput, VandorLoginInput } from "../dto";
import { VandorService } from "../services";
import { OK } from "../core/success.response";
import { AuthFailureError } from "../core/error.response";
import { CreateFoodInput } from "../dto/Food.dto";

export const VandorLogin = async (request: Request, response: Response) => {
	const bodyData = <VandorLoginInput>request.body;
	const result = await VandorService.VandorLogin(bodyData);

	new OK({
		message: "Login successfully",
		metaData: result,
	}).send(response);
};

export const GetVandorProfile = async (
	request: Request,
	response: Response
) => {
	const user = request.user;

	if (user) {
		const existingVandor = await VandorService.FindVandor({ id: user._id });
		response.json(existingVandor);
	}
};

export const UpdateVandorProfile = async (
	request: Request,
	response: Response
) => {
	const user = request.user;
	const bodyData = <VandorEditInput>request.body;

	if (!user) throw new AuthFailureError();

	const result = await VandorService.UpdateVandorProfile(bodyData, user);

	new OK({
		message: "Update vandor successfully",
		metaData: result,
	}).send(response);
};

export const UpdateVandorService = async (
	request: Request,
	response: Response
) => {
	const user = request.user;

	if (!user) throw new AuthFailureError();

	const result = await VandorService.UpdateVandorService(user);

	new OK({
		message: "Update vandor successfully",
		metaData: result,
	}).send(response);
};

export const AddFood = async (request: Request, response: Response) => {
	const user = request.user;

	if (!user) throw new AuthFailureError();

	const bodyData = <CreateFoodInput>request.body;

	const result = await VandorService.AddFood(bodyData, user);

	new OK({
		message: "Add food successfully",
		metaData: result,
	}).send(response);
};

export const GetFoods = async (request: Request, response: Response) => {
	const user = request.user;

	if (!user) throw new AuthFailureError();

	const result = await VandorService.UpdateVandorService(user);

	new OK({
		message: "Update vandor successfully",
		metaData: result,
	}).send(response);
};
