const express = require("express");
const { createTimeTable,deleteTimeTable } = require("../controllers/timetable-controller");

const timetableRouter = express.Router();


// teacherRouter.get("/",getAllTeacher);
// teacherRouter.post("/signup", signUp);
timetableRouter.post("/" , createTimeTable);
timetableRouter.delete("/:timetableId" , deleteTimeTable);
// subjectRouter.post("/list" , subjectList);

module.exports =  timetableRouter;