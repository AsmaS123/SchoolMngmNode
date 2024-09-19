const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const verifyToken = async(req,res,next) => {
    const header = req.headers;
    // console.log(header.token,'token')
    const SECRET_KEY = process.env.SECRET_KEY;
    // console.log(SECRET_KEY,'SECRET_KEY')
    const result=  jwt.verify(header.token, SECRET_KEY);
    return res.status(200).json({result: result});
}

module.exports = { verifyToken};

