const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleId: String,
    facebookId: String,
    givenName: String,
    familyName: String,
    photo: String,
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;