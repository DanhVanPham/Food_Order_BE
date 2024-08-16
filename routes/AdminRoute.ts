import express from "express";
import { CreateVandor, GetVandorByID, GetVandors } from "../controllers";
import { AdminValidate, ValidationObjectId } from "../validations";
import { Authenticate, ValidateHandler } from "../middlewares";
import { AsyncHandler } from "../helpers/AsynHandler";

const router = express.Router();

router.post(
	"/",
	AdminValidate.validateCreateVandor(),
	ValidateHandler,
	Authenticate,
	AsyncHandler(CreateVandor)
);

router.get("/", AsyncHandler(GetVandors));

router.get(
	"/:id",
	ValidationObjectId(),
	ValidateHandler,
	AsyncHandler(GetVandorByID)
);

export { router as AdminRoute };
