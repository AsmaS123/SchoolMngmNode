const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Attendance Schema
var AttendanceSchema = new Schema({
 user_id: {type:Number, required: true,unique:false},
 date: {type: Date, required: true},
 status: {type:Boolean, required: true},
});

const Attendance =  mongoose.model("Attendance", AttendanceSchema);
// module.exports =  mongoose.model("Attendance", AttendanceSchema);

// export const Attendance = models.Attendance || model('Attendance', AttendanceSchema);

//Student Schema
var StudentSchema = new Schema({
    student_id: {type:Number, required: true,unique:true}, //PK
    email:{type:String, required:true,unique:true},
    password:{type:String},
    name:{type:String, required:true},
    dob: {type: Date, required: true},
    gender:{type:String, required:true},
    address:{type:String, required:true},
    phone:{type:String, required:true},
    date_of_join: {type: Date, required: true},
    parent_name:{type:String, required:true},
    issue: [{ type: Schema.Types.ObjectId, ref: 'Issue' }],
    attendance: [{ type: Schema.Types.ObjectId, ref: 'Attendance' }]
   });

const Student = mongoose.model("Student", StudentSchema);
// module.exports =  mongoose.model("Student", StudentSchema);

// export const Student = models.Student || model('Student', StudentSchema);

//Teacher Schema
var TeacherSchema = new Schema({
    teacher_id: {type: Number, required: true,unique:true}, //PK
    email:{type:String, required:true,unique:true},
    name:{type:String, required:true},
    dob: {type: Date, required: true},
    gender:{type:String, required:true},
    address:{type:String, required:true},
    phone:{type:String, required:true},
    date_of_join: {type: Date, required: true},
    classroom: [{ type: Schema.Types.ObjectId, ref: 'Classroom' }],
   },
    {
    timestamps: true
    });

const Teacher =  mongoose.model("Teacher", TeacherSchema);
// module.exports =  mongoose.model("Teacher", TeacherSchema);


// //Issue Schema
var IssueSchema = new Schema({
    issue_id: {type: Number, required: true,unique:true}, //FK
    type:{type:String, required:true,unique:true},
    details:{type:String, required:true,unique:true},
    is_resolved: {type: Boolean, required: true},
    student: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
   });

const Issue =  mongoose.model("Issue", IssueSchema);
// const Issue = models.Issue || model('Issue', IssueSchema);


//Classroom Student Schema
var ClassroomStudentSchema = new Schema({
    student_id: {type: Number, required: true,unique:true},    //FK
    classroom_id: {type: Number, required: true,unique:true},  //FK
   });

const ClassroomStudents =  mongoose.model("ClassroomStudent", ClassroomStudentSchema);
// module.exports =  mongoose.model("ClassroomStudent", ClassroomStudentSchema);


//Subject Schema
var SubjectSchema = new Schema({
    subject_id: {type: Number, required: true,unique:true},    //PK
    name:{type:String, required:true},
    grade:{type:Number, required:true},
    description:{type:String, required:true},
   });
const Subject =  mongoose.model("Subject", SubjectSchema);


// //Result Schema
// var CreateResultSchema = new Schema({
//     exam_id: {type: Number, required: true,unique:true},    //PK
//     student_id:{type:Number, required:true,unique:true},   //FK
//     subject_id:{type:Number, required:true,unique:true},   //FK
//     marks:{type:Number, required:true,unique:true},
//    });

// export const Result = models.Result || model('Result', CreateResultSchema);


// //Exam Schema
// var CreateExamSchema = new Schema({
//     exam_id: {type: Number, required: true,unique:true},    //PK
//     date:{type:Date, required:true,unique:true},   
//     name:{type:String, required:true,unique:true}, 
//     type:{type:Number, required:true,unique:true},
//    });

// export const Exam = models.Exam || model('Exam', CreateExamSchema);



// //Classroom Schema


var CreateClassroomSchema = new Schema({
    classroom_id: {type: Number, required: true},    //PK
    teacher_id:{type:Number, required:true},   
    section:{type:String, required:true},  
    grade:{type:Number, required:true},
    teacher: { type: Schema.Types.ObjectId, ref: 'Teacher' },
    timetable: [{ type: Schema.Types.ObjectId, ref: 'Timetable' }],
   });

const Classroom =  mongoose.model("Classroom", CreateClassroomSchema);
// module.exports =  mongoose.model("Classroom", CreateClassroomSchema);

// export const Classroom = models.Classroom || model('Classroom', CreateClassroomSchema);


// //Timetable Schema
var CreateTimetableSchema = new Schema({
    timetable_id: {type: Number, required: true,unique:true},    //FK
    day:{type:String, required:true},   
    time:{type:String, required:true},   
    subject:{type:String, required:true},
    // classroom: { type: Schema.Types.ObjectId, ref: 'Classroom' },
    classroomid: { type: Schema.Types.Number, ref: 'Classroom' }, 
   });

const Timetable =  mongoose.model("Timetable", CreateTimetableSchema);

// export const Timetable = models.Timetable || model('Timetable', CreateTimetableSchema);


module.exports = {Attendance,Student, Teacher, ClassroomStudents, Classroom ,Subject,Timetable}