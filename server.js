// const  { teacherRouter, signUpRouter, loginRouter, verifyTokenRouter, classroomRouter, subjectRouter, timetableRouter } = require("./routes/index")
const teacherRouter = require("./routes/teacher-router");
const signUpRouter = require("./routes/signup-router");
const loginRouter = require("./routes/login-router"); 
const verifyTokenRouter = require("./routes/index-router"); 
const classroomRouter = require("./routes/classroom-router");
const subjectRouter = require("./routes/subject-router");
const timetableRouter = require("./routes/timetable-router");
const studentRouter = require("./routes/student-router");
const attendanceRouter = require("./routes/attendance-router");
const authenticate= require("./middleware/authenticate ");
const logger = require("./middleware/loger");

//entry point of application
const express = require('express');

require("./config/db");
var http = require('http');
const cors = require("cors");
var corsOptions = {
  origin: "http://localhost:8081"
};

const app = express();
app.use(cors());
// app.use(cors(corsOptions));
// app.use(cors({ origin: ["http://localhost:3000", "https://origin2.com","*", "http://54.82.11.113:3000/"] }));

app.set("view engine", "ejs");
app.use(express.json());
app.use("/api/teachers", teacherRouter);
// app.use("/api/teachers",[authenticate], teacherRouter);
app.use("/api/signUp", signUpRouter);
app.use("/api/login", loginRouter);
app.use("/api/index", verifyTokenRouter)
app.use("/api/classroom",classroomRouter)
app.use("/api/subject",subjectRouter)

// app.use("/api/index", [authenticate], verifyTokenRouter)
// app.use("/api/classroom", [authenticate], classroomRouter)
// app.use("/api/subject",[authenticate], subjectRouter)

app.use("/api/timetable", timetableRouter)
app.use("/api/student", studentRouter)
app.use("/api/attendance", attendanceRouter)
// app.use("/api/timetable",[authenticate], timetableRouter)


app.listen(5003, () => {
  logger.log("info", `App listening on port 5003!`);
});


app.get('/protected', authenticate, (req, res) => {
  if(req.routestatus == 'valid'){
    res.json({ message: req.message ,email:req.email, status: req.routestatus, password:req.password});
  }
  else{
    res.json({ message: req.message});
  }
  
});
