import bcrypt from "bcrypt";

export const Encrypt = async (req, res, next) => {
    try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        next();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
