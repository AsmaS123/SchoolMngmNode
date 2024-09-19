const express = require("express");
const {  getAllTeacher  ,logIn ,getAllTeachersList,createTeacher,getAllTeachersTimetable,updateTeacher} = require("../controllers/teacher-controller");
const teacherRouter = express.Router();


teacherRouter.get("/",getAllTeacher);
teacherRouter.get("/timetableList", getAllTeachersTimetable);
teacherRouter.get("/list",getAllTeachersList);
teacherRouter.post("/creat",createTeacher);
teacherRouter.put("/update",updateTeacher)
// teacherRouter.post("/signup", signUp);
// teacherRouter.post("/login" , logIn);

module.exports =  teacherRouter;