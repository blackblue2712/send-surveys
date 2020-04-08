module.exports = app => {
    app.get("/api/surveys", (req, res) => {
        console.log("req.user", req.user);
        return res.json(req.user);
    })
}