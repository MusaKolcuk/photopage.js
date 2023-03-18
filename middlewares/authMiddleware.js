import User from "../models/userModel.js";
import jwt from "jsonwebtoken";


const checkUser = async (req, res, next) => {
    const token = req.cookies.jwt;                      // token a cookie uzerinden ulastik

    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            }
            else {
                const user = await User.findById(decodedToken.userId)
                res.locals.user = user                                      //sisteme giris yağpan kullanici burada bulunur.
                next();
            }
        })
    }
    else {
        res.locals.user = null;
        next();
    }
}


const authenticateToken = async (req, res, next) => {

    try {

        const token = req.cookies.jwt;

        if(token) {
            jwt.verify(token, process.env.JWT_SECRET, (err) => {

                if(err) {
                    console.log(err.message);
                    res.redirect("/login");
                }
                else {
                    next();
                }
            })
        }
        else {
            res.redirect("/login");
        }




        // const token =
        // req.headers["authorization"] && req.headers["authorization"].split(" ")[1];

    // if(!token) {
    //     return res.status(401).json({
    //         succeded: false,
    //         error: "No token available",
    //     });
    // }

    // req.user = await User.findById(
    //     jwt.verify(token, process.env.JWT_SECRET).userId
    // );

    // next();
    } catch (error) {
        res.status(401).json({
            succeded: false,
            error: "Not authorized"
        })
    }

};

export {authenticateToken, checkUser}