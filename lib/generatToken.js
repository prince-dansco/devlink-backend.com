
import jwt from "jsonwebtoken";

export const generatToken = (userId, res) => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '5h',
    });

    res.cookie("jwt", token, {
        httpOnly: true, 
        secure: true,
        sameSite: "none",
        maxAge: 5 * 60 * 60 * 1000,
    });
    
    return token;
}





        