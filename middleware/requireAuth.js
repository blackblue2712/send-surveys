

module.exports = (req, res, next) => {
    if(!req.user) return res.json({ message: "[Unauthorized] maybe your cookies were expired, please login", status: "danger", statusCode: 401 });
    next();
}