import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new Schema(
    
    {

        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        fullname: {
            type: String,
            required: true,
            trim: true,
            index: true
        },

        avatar: {
            type: String,
            required: true,
        },

        coverImage: {
            type: String,
            // required: true
        },

        watchHistory: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Video"
            }
        ],

        password: {
            type: String,
            required: [true, "Password is required"],
        },

        refreshToken: {
            type: String
        }
    },

    {
        timeStamps: true
    }
)

userSchema.pre("save", async function(next) {

    if (!this.isModified("password")) return next();
    
    this.password = bcrypt.hash(this.password, 10)
    console.log(this.password);
    next()
})

userSchema.methods.isPasswordCorrect = async function(password) {
    // console.log(this.password);
    // console.log(password);
    const result = await bcrypt.compare(password, this.password)
    // console.log(result);
    return result
}

userSchema.methods.generateAccessToken = function() {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname
    },
        process.env.ACCESS_TOKEN_SECRET,
       {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
       }
    ) 
}
userSchema.methods.generateRefreshToken = function() {
    return jwt.sign({
        _id: this._id
    },
        process.env.REFRESH_TOKEN_SECRET,
       {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
       }
    ) 
}

export const User = mongoose.model("User", userSchema)