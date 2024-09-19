 const teacherRouter = require("./routes/teacher-router");
const signUpRouter = require("./routes/signup-router");
const loginRouter = require("./routes/login-router"); 
const verifyTokenRouter = require("./routes/index-router"); 
const classroomRouter = require("./routes/classroom-router");
const subjectRouter = require("./routes/subject-router");
const timetableRouter = require("./routes/timetable-router");

module.exports =  { teacherRouter, signUpRouter, loginRouter, verifyTokenRouter, classroomRouter, subjectRouter, timetableRouter};