const express = require("express");
const {  deleteAttendance, updateAttendance, createAttendance,getAllAttendance,getAllUserID,getByUserID} = require("../controllers/attendance-controller");
const attendanceRouter = express.Router();


attendanceRouter.get("/",getAllAttendance);
attendanceRouter.get("/userIdList",getAllUserID);
attendanceRouter.post("/", createAttendance);
attendanceRouter.put("/", updateAttendance);
attendanceRouter.delete("/:_id", deleteAttendance);
attendanceRouter.get("/:_id", getByUserID);
// studentRouter.get("/" , getAllStudent);

module.exports =  attendanceRouter;