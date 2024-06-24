import express from "express";
import { filter, getLocations } from "../controllers/FilterController.js";

const FilterRouter = express.Router();

FilterRouter.get("/locations", getLocations);
FilterRouter.post("/", filter);

export default FilterRouter;
