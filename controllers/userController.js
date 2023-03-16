import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import  jwt  from "jsonwebtoken";

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({
            succeded: true,
            user,
    });
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error,
        });
    }
};


const loginUser = async (req, res) => {
    try {
        const {username, password} = req.body;

        const user = await User.findOne({username});

        let same = false;

        if(user) {
            same = await bcrypt.compare(password, user.password);
        }
        else {
            return res.status(401).json({
                succeded: false,
                error: "Kullanici bulunamadi",
            });
        }
        if(same) {
            res.status(200).json({
                user,
                token: createToken(user._id),            // o an giris yapan kullanicinin _id si ile bir token olustur
            })
        }
        else {
            res.status(401).json({
                succeded: false,
                error: "Password yanlis",
            });
        }
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error,
        });
    }
}

// Token olusturma
const createToken = (userId) => {
    return jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '1d',                        // Token in gecerlilik suresi 1d yani 1 day(1gün)
    })
}

export { createUser, loginUser, createToken};