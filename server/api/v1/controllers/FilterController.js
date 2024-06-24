import { PropertyModel } from "../models/PropertyModel.js";

export const getLocations = async (req, res) => {
    try {
        let location = await PropertyModel.find({}, { location: 1, _id: 0 });
        let locations = [];
        location.forEach((ele) => {
            if (!locations.includes(ele.location)) {
                locations.push(ele.location);
            }
        });
        res.json(locations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const filter = async (req, res) => {
    try {
        let query = {
            $and: [
                {
                    location: req.body.location,
                },
                {
                    type: {
                        $in: req.body.type,
                    },
                },
                {
                    price: {
                        $gte: req.body.min,
                        $lte: req.body.max,
                    },
                },
            ],
        };
        let property = await PropertyModel.find(query);
        res.json(property);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
