import jwt from "jsonwebtoken";

const generateToken = (userId, res) => {
    // user has to login after 7 days
    const token = jwt.sign({ userId }, process.env.JWT_TOKEN, {
        expiresIn: "7d"
    })
// not so mandatory
    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, //ms
        httpOnly: true,  // prevent XSS attacks cross-site request scripting attacks
        sameSite: "strict", // CSRF attacks cross-site request forgery attacks
        secure: process.env.NODE_ENV!== "development"
    });

    return token;
}; 

export default generateToken;