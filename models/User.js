const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    FullName: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
        unique: true
    }
});
module.exports = mongoose.model("User", UserSchema);