if(process.env.NODE_ENV === "CI") {
    module.exports = require("./ci");
} else if(process.env.NODE_ENV === "production") {
    module.exports = require("./prod");
} else {
    module.exports = require("./dev");
}