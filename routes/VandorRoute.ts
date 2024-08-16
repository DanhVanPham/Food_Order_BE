import express from "express";
import {
	AddFood,
	GetFoods,
	GetVandorProfile,
	UpdateVandorProfile,
	UpdateVandorService,
	VandorLogin,
} from "../controllers";
import { AsyncHandler } from "../helpers/AsynHandler";
import { VandorValidate } from "../validations";
import { Authenticate, ValidateHandler } from "../middlewares";

const router = express.Router();

router.post(
	"/login",
	VandorValidate.validateVandorLogin(),
	ValidateHandler,
	AsyncHandler(VandorLogin)
);

router.use(Authenticate);

router.get("/profile", AsyncHandler(GetVandorProfile));

router.patch(
	"/profile",
	VandorValidate.validateVandorEdit(),
	ValidateHandler,
	AsyncHandler(UpdateVandorProfile)
);

router.patch("/service", AsyncHandler(UpdateVandorService));

router.post("/foods", AsyncHandler(AddFood));

router.get("/foods", AsyncHandler(GetFoods));

export { router as VandorRoute };
