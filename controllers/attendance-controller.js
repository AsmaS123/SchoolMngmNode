const User = require("../models/User");

const authenticate= require("../middleware/authenticate ");
const  {Student, Classroom ,Issue,Attendance,ClassroomStudents, Teacher} = require("../models/model")
const bcrypt = require("bcryptjs");
const logger = require("../middleware/loger");

const getAllAttendance = async(req,res,next) =>{
    let attendance;
    let token;

        try{
            // const pipeline = [
            //     {
            //       '$lookup' : {
            //           'from' : 'attendances',
            //           'localField' : 'user_id',
            //           'foreignField' : '_id',
            //           'as' : 'attendances'
            //       }
            //     }
            //   ]

            attendance = await Attendance.find();
            return res.status(200).json({ attendance : attendance})
        }   
        catch(err){
            console.log(err);
        }
        if(!students){
            return res.status(404).json({ message : "Students are not found"})
        }
    
        return res.status(200).json({students});
}

const getAllUserID = async(req,res,next) =>{
    let userIdList;
    
    try{
        userIdList = await Student.find({},{student_id:1, _id:1});
        const formattedUserIdList = userIdList.map(user => ({
            user_id: user.student_id,
            _id: user._id
          }));
      
        return res.status(200).json({ userIdList:formattedUserIdList })
    }
    catch(e){console.log(e);
        return res.status(400).json({message: "Incorrect data!"});
    }
}


const getByUserID = async(req,res,next) =>{
    const id = req.params._id;
    try{
        if(id){
            const result = await Attendance.findOne({_id:id});
            if(result){
                return res.status(200).json({attendance : result})
           }
        }
    }
    catch(e){console.log(e);
        return res.status(400).json({message: "Incorrect data!"});
    }
}

const createAttendance = async(req,res,next) =>{
    const { user_id ,date,status } = req.body;
    let existingAttendance;
    // const student_id = Math.floor(Math.random() * 100000);
    const attendance = new Attendance({
        user_id: user_id,
        date: date,
        status:status,
    });

    try{
        existingAttendance = await Attendance.findOne({ user_id:user_id , date:date})
       if(existingAttendance){
            return res.status(400).json({message : "this record already exists!"})
       }
       else{
        const result =  await attendance.save();
        if(result){
          const temp = await Student.findOneAndUpdate({student_id:user_id},{$push:{attendance: result}})  
         return res.status(201).json({ temp })
        }
       }
    }
    catch(e){console.log(e);
        return res.status(400).json({message: "Incorrect data!"});
    }
 }
 
 const updateAttendance = async(req,res,next) =>{
    const { date ,status,_id,user_id } = req.body;
    // console.log(req.body,'req.body')
    try{
        const result =  await Attendance.updateOne({_id: _id,},{$set: {    
            date: date,
            status:status,
        }})
        return res.status(200).json({ result })
       }
    catch(e){
        console.log(e);
        return res.status(400).json({message: "Incorrect data!"});
    }
 }


 const deleteAttendance = async(req,res,next) =>{
    const id = req.params._id;
    // const id = req.query._id;
    console.log(id,'id')
    try{
    const result = await Attendance.findOneAndDelete({_id:id});
    if(result && result._id && result.user_id ){
      const studentresult = await Student.updateOne({student_id:result.user_id}, {$pull:{attendance:result._id }});
      console.log(studentresult,'studentresult')
      return res.status(200).json({ message:`${result._id} deleted successfully` });
    }
    }
    catch(err){
      console.log(err)
    }
   };

module.exports = { createAttendance ,getAllAttendance,getAllUserID,updateAttendance,deleteAttendance,getByUserID};
