import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/UserModel.js";

export const login = async (req, res) => {
    try {
        // let user = req.query;
        // let accessToken = jwt.sign(user);
        let user = await UserModel.findOne({ username: req.query.username });
        const isMatch = await bcrypt.compare(req.query.password, user.password);
        if (!isMatch) {
            res.json({ error: "Invalid username or password" });
        } else {
            let authToken = jwt.sign(
                {
                    id: user._id,
                    username: user.username,
                },
                process.env.AUTH_TOKEN
            );
            if (user.isSeller) {
                res.json({
                    authToken: authToken,
                    isSeller: true,
                    sellerData: {
                        owner: user.username,
                        ownerPhone: user.phone,
                        ownerMail: user.email,
                    },
                });
            } else {
                res.json({ authToken: authToken });
            }
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const register = async (req, res) => {
    try {
        let existCheck = [
            { username: req.body.username },
            { email: req.body.email },
            { phone: req.body.phone },
        ];
        let exist = await UserModel.find().or(existCheck);
        if (exist.length == 0) {
            let user = new UserModel(req.body);
            await user.save();
            res.json(true);
        } else {
            res.json({
                error: "Username / Email / Password already exist!",
            });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
