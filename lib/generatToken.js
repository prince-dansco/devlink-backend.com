
import jwt from "jsonwebtoken";

export const generatToken = (userId, res) => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });

    res.cookie("jwt", token, {
        httpOnly: true, 
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 60 * 60 * 1000,
    });
    
    return token;
}