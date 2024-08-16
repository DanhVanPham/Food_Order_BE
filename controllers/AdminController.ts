import { Request, Response } from "express";
import { CreateVandorInput } from "../dto";
import { AdminService } from "../services";
import { CREATED, OK } from "../core/success.response";
import { ReasonPhases } from "../utility";

export const CreateVandor = async (request: Request, response: Response) => {
	const bodyData = <CreateVandorInput>request.body;

	const createdVandor = await AdminService.CreateVandor(bodyData);

	new CREATED({
		message: "Create vandor successfully",
		metaData: createdVandor,
	}).send(response);
};

export const GetVandors = async (request: Request, response: Response) => {
	const vandors = await AdminService.GetVandors();

	new OK({
		message: ReasonPhases.OK,
		metaData: vandors,
	}).send(response);
};

export const GetVandorByID = async (request: Request, response: Response) => {
	const foundVandor = await AdminService.GetVandorByID(request.params.id);

	new OK({
		message: ReasonPhases.OK,
		metaData: foundVandor,
	}).send(response);
};
