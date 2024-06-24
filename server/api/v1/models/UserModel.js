import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    isSeller: {
        type: Boolean,
        required: true,
        default: false,
    },
});

export const UserModel = mongoose.model("User", UserSchema);
