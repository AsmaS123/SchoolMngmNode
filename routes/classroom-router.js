const express = require("express");
const { createClassroom } = require("../controllers/classroom-controller");

const classroomRouter = express.Router();


// teacherRouter.get("/",getAllTeacher);
// teacherRouter.post("/signup", signUp);
classroomRouter.post("/" , createClassroom);

module.exports =  classroomRouter;