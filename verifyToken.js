const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {

    const Header = req.headers.token;

    if (Header) {
        const token = Header.split(" ")[1];

        jwt.verify(token, process.env.JWT_SEC, (err, user) => {

            if (err) { res.status(401).json("Token is not valid!") };
            req.user = user;
            next();
        })
    } else {
        return res.status(401).json("You are not authonicated");
    }
}
//check if can make changes
const Token_Authorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.role) {
            next()
        } else {
            res.status(401).json("You arenot allowed to update");
        }
    })}
//check if admin
    const Token_Admin = (req, res, next) => {
        verifyToken(req, res, () => {
            if (req.user.role) {
                next()
            } else {
                res.status(401).json("You are not admin");
            }
        })
    }

    module.exports = { verifyToken, Token_Authorization, Token_Admin };   