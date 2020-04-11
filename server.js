const express = require("express");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
const path = require("path");
const compression = require("compression");

const keys = require("./config/keys");

const app = express();

// SERVICES
require("./services/passport");

// DATABASE
mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("database connnecting ...");
});
mongoose.connection.on("error", (error) => {
    console.log(`Connect occur error: ${error}`);
});

// MIDDLEWARES
app.use(compression());
app.use(express.static("client/build"));
app.use(cors());
app.use(bodyParser.json());
app.use(cookieSession({
    keys: [keys.cookieSecret],
    maxAge: 24 * 60 * 60 * 1000 * 30
}));
app.use(passport.initialize());
app.use(passport.session());

// ROUTES
require("./routes/auth.route")(app);
require("./routes/surveys.route")(app);
require("./routes/notify.route")(app);

// PRODUCTION
if(process.env.NODE_ENV === "production") {
    app.get("*", (req, res) => {
        res.sendFile(path.resolve("client", "build", "index.html"));
    })
};

// PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server listen on port ${PORT}`);
});