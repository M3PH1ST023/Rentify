import express from "express";
import {
    addProperty,
    deleteProperty,
    editProperty,
    getProperties,
    getPropertyByUser,
} from "../controllers/PropertyController.js";

const PropertyRouter = express.Router();

PropertyRouter.get("/", getProperties);
PropertyRouter.get("/:id", getPropertyByUser);
PropertyRouter.post("/", addProperty);
PropertyRouter.patch("/:id", editProperty);
PropertyRouter.delete("/:id", deleteProperty);

export default PropertyRouter;
