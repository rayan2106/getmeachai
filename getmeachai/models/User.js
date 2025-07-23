import mongoose from "mongoose";
const { Schema  , model } = mongoose;

const UserSchema = new Schema({
    name: { type: String,},
    email: { type: String, required: true},
    username: { type: String,}, 
    profilepic: { type: String},
    coverpic: { type: String},
    createdAt: { type: Date, default: Date.now },
    UpdatedAt: { type: Date, default: Date.now },
    razorpayid: { type: String, required: true },
    razorpaysecret: { type: String, required: true },
})


export default mongoose.models.User || model("User", UserSchema);