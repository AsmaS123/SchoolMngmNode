const express = require("express");
const  { verifyToken  }= require("../controllers/index-controller");
const verifyTokenRouter = express.Router();
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

verifyTokenRouter.get("/", verifyToken);

module.exports =  verifyTokenRouter;