const User = require("../models/User");

const authenticate= require("../middleware/authenticate ");
const  {Student, Classroom ,Issue,Attendance,ClassroomStudents} = require("../models/model")
const bcrypt = require("bcryptjs");
const logger = require("../middleware/loger");

const getAllStudent = async(req,res,next) =>{
    let students;
    let token;
        try{
            students = await Student.find()
        }
        catch(err){
            logger.log(err);
        }
        if(!students){
            return res.status(404).json({ message : "Students are not found"})
        }
    
        return res.status(200).json({students});
}



const createStudent = async(req,res,next) =>{
    const { email ,name,gender,address,phone,date_of_join, dob,parent_name } = req.body;
    let existingTeacher;
    const student_id = Math.floor(Math.random() * 100000);
    const student = new Student({
        student_id: student_id,
        email: email,
        name:name,
        gender:gender,
        address:address,
        phone:phone,
        date_of_join:date_of_join,
        dob:dob,
        parent_name:parent_name
    });

    try{
        existingStudent = await Student.findOne({ student_id:student_id  })
       if(existingStudent){
            return res.status(400).json({message : "this record already exists!"})
       }
       else{
        const result =  await student.save();
        if(result){
         return res.status(201).json({ result })
        }
       }
    }
    catch(e){console.log(e);
        return res.status(400).json({message: "Incorrect data!"});
    }
 }
 
 const studentSignup = async(req,res,next) =>{
    const { studentId ,password} = req.body;
    try{
    const result = await Student.findOneAndUpdate({student_id:studentId},{$set:{password:password}})
    return res.status(201).json({ result })
    }
    catch(e){console.log(e);
        return res.status(400).json({message: "Incorrect data!"});
    }
 }

module.exports = { getAllStudent,createStudent,studentSignup };
