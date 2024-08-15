import express from "express";
import dotenv from "dotenv";
import { PORT } from "./config/constants";
import { AdminRoute, VandorRoute } from "./routes";

dotenv.config();

const app = express();

app.use("/admin", AdminRoute);
app.use("/vandor", VandorRoute);

app.listen(PORT, () => {
	console.log(`Server listening port: ${PORT}`);
});
