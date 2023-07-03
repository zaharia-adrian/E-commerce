import jwt from "jsonwebtoken";
import User from "../models/user.js";

const requireAuth = async(req, res, next) => {
    //verify authentication
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required' });
    }

    const token = authorization.split(' ')[1];

    try {
        const { _id } = jwt.verify(token, "thdscskjcnksnckjsndcksncsdlc");

        req.body.user = await User.findOne({ _id }).select('_id');

        next();
    } catch (error) {
        console.log(error.message);
        res.status(401).json({ error: error.message});
    }

}

export default requireAuth;