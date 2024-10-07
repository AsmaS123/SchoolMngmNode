const express = require("express");
const {  getAllStudent ,createStudent,studentSignup} = require("../controllers/student-controller");
const studentRouter = express.Router();


// teacherRouter.get("/",getAllTeacher);
studentRouter.post("/signup", studentSignup);
studentRouter.post("/", createStudent);
studentRouter.get("/" , getAllStudent);

module.exports =  studentRouter;