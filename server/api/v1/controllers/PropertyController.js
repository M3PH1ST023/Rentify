import { PropertyModel } from "../models/PropertyModel.js";
import { UserModel } from "../models/UserModel.js";

export const getProperties = async (req, res) => {
    try {
        let property = await PropertyModel.find();
        res.json(property);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const addProperty = async (req, res) => {
    try {
        let newProperty = {
            location: req.body.location,
            area: req.body.area,
            price: req.body.price,
            link: req.body.link,
            type: req.body.type,
            owner: req.body.owner,
            ownerPhone: req.body.ownerPhone,
            ownerMail: req.body.ownerMail,
        };
        let property = new PropertyModel(newProperty);
        await property.save();
        res.json(true);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getPropertyByUser = async (req, res) => {
    try {
        let user = await UserModel.findOne({ _id: req.params.id });
        let property = await PropertyModel.find({ owner: user.username });
        res.json(property);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const editProperty = async (req, res) => {
    try {
        let id = req.params.id;
        let data = req.body;
        const property = await PropertyModel.findByIdAndUpdate(id, data);
        if (property) {
            res.json(true);
        } else {
            res.json({ error: "Error Occured, Try again !" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteProperty = async (req, res) => {
    try {
        await PropertyModel.deleteOne({ _id: req.params.id });
        res.json(true);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
