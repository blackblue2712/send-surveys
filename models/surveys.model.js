const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const Recipients = require("./recipients.model");

const surveysSchema = new Schema({
    owner: {
        type: ObjectId,
        ref: "user"
    },
    title: String,
    subject: String,
    body: String,
    recipients: [Recipients],
    yes: {
        type: Number,
        default: 0
    },
    no: {
        type: Number,
        default: 0
    },
    created: {
        type: Date,
        default: Date.now()
    },
    lastUpdate: Date
});

const surveys = mongoose.model("surveys", surveysSchema);

module.exports = surveys;