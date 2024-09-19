const express = require("express");
const {  createSubject,subjectList } = require("../controllers/subject-controller");
const subjectRouter = express.Router();


// teacherRouter.get("/",getAllTeacher);
// teacherRouter.post("/signup", signUp);
subjectRouter.post("/" , createSubject);
subjectRouter.post("/list" , subjectList);

module.exports =  subjectRouter;