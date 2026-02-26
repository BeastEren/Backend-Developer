const jwt = require('jsonwebtoken');

async function identifyUser(req, res, next) {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Token not found"
        })
    }

    let decord = null;
    try {
        decord = jwt.verify(token, process.env.JWT_TOKEN);
    } catch (err) {
        return res.status(401).json({
            message: "User token invalid"
        })
    }

    req.user = decord;
    next();
}

module.exports = identifyUser;