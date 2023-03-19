import mongoose, { mongo } from "mongoose";
import bcrypt from "bcrypt"
import validator from "validator";

const { Schema} = mongoose

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username area is required"],
        unique: true,
        lowercase: true, // buyuk harfle kullanici adi olusturulmaz.
        validate: [validator.isAlphanumeric, "Only Alphanumeric characters"],      //Alphanumeric yalnizca rakam ve harflerden olusan karakterler demektir.
    },
    email: {
        type: String,
        required: [true, "Email area is required"],
        unique: true,
        validate: [validator.isEmail, "Valid email is required"]
    },
    password: {
        type: String,
        required: [true, "Password area is required"],
        minLength: [4, "At least 4 characters"],
    },
    followers: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    followings: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        }
    ],
},
{
    timestamps: true
}
);





// HASH İSLEMLERİ
userSchema.pre("save", function (next){
    const user = this;
    bcrypt.hash(user.password, 10, (err, hash) => {
        user.password = hash;
        next();
    })
})

const User = mongoose.model("User", userSchema);

export default User;