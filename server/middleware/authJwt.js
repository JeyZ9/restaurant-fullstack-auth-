import jwt from "jsonwebtoken";
import authConfig from "../config/auth.config.js";
import User from "../models/user.model.js"

const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if(!token){
        return res.status(403).send({
            message: "No Token Provided!",
        });
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if(err){
            return res.status(401).send({
                message: "Unauthorized!",
            });
        }
        req.username = decoded.username;
        next();
    })
} 

const isAdmin = (req, res, next) => {
    User.findByPk(req.username).then((user) => {
        user.getRoles().then((roles) => {
            const role = roles.find((role) => 
              role.roleName === "admin"
            );
            if(role){
                console.log(true);
                return next();
            }

            return res.status(401).send({
                message: "Unauthorized access, require admin role!"
            })
        })
    })
}

const authJwt = { verifyToken, isAdmin };



export default authJwt;