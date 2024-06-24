import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PropertySchema = new Schema({
    location: {
        type: String,
        required: true,
    },
    area: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
        required: true,
    },
    ownerPhone: {
        type: Number,
        required: true,
    },
    ownerMail: {
        type: String,
        required: true,
    },
    postedDate: {
        type: Date,
        required: true,
        default: new Date(),
    },
});

export const PropertyModel = mongoose.model("Property", PropertySchema);
