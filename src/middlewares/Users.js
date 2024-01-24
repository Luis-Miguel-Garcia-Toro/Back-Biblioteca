const { NextFuction, Request, Response } = require("express");
const { JWTManager } = require("../lib/index.js");

const getUserData = (req, res, next) => {
    const { headers } = req;
    const token = headers.authorization?.split(" ")?.[1];
    const { data: user, exp } = JWTManager.decodeToken(token ?? "");
    if (!user || exp < Date.now() / 1000) return res.status(200).json({ text: "no autorizado" });
    req.actualUser = user;
    next();
}

const requireActiveUser = async (req, res, next) => {
    if (req.user) {
        const user = await User.findOne({
            where: {
                id: req.user.id
            }
        });
        if (user && user.user_isActive) {
            next();
        } else {
            res.status(401).json({
                code: 401,
                text: "El usuario no está activo"
            });
        }
    } else {
        res.status(401).json({
            code: 401,
            text: "Por favor, inicie sesión para continuar"
        });
    }
};

module.exports = {
    getUserData, requireActiveUser
}
