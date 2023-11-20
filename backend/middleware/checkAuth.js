import jwt from "jsonwebtoken";

export default function checkAuth(req, res, next) {
    let token = req.cookies.token

    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ message: "Authentification Failed" });
            } else {
                next()
            }
        })
    } else {
        return res.status(401).json({ message: "Authentification Failed" });
    }
}