const User = require("../models/User");
const  {Timetable,Classroom,Subject, Teacher } = require("../models/model");


const createTimeTable = async(req,res,next) =>{
    const { classroom_id , subjectName,teacher_id,section,grade, dayname, timetime } = req.body;
    // console.log(req.body,'create timetable');

    let existingTimetable;
    let existingClassroom;
    const timetable_id = Math.floor(Math.random() * 100000);
  
    try{
      let resulttimetable;
      let resultclassroom;
      let updateTeacher;
      let updateClassroom;
      existingClassroom = await Classroom.find({classroom_id:classroom_id},{});
      if(!(existingClassroom && existingClassroom.length>0)){
        const classroom = new Classroom({
          classroom_id: classroom_id,
          teacher_id: teacher_id,
          section: section,
          grade: grade,
          timetable:[]
        })
       resultclassroom = await classroom.save();
       console.log(resultclassroom,'resultclassroom')
      }
      else{
        resultclassroom = existingClassroom;
      }
      console.log(resultclassroom[0]._id,'resultclassroom_id')
      console.log(resultclassroom,'resultclassroom')
      // const searchTeacherClassroom = await Teacher.find({teacher_id:teacher_id, classroom:{ $in: [resultclassroom[0]._id]}},{})
      // if(searchTeacherClassroom && searchTeacherClassroom.length>0){
      //   updateTeacher = searchTeacherClassroom;
      //   console.log(searchTeacherClassroom,'searchTeacherClassroom')
      // }
      // else{
        updateTeacher = await Teacher.updateOne({teacher_id:teacher_id},{$push:{classroom:resultclassroom}})
      // }
      existingTimetable = await Timetable.find({day:dayname,time:timetime ,subject:subjectName, classroomid:classroom_id },{})
      if(!(existingTimetable && existingTimetable.length>0)){
        const timetable = new Timetable({
          timetable_id:timetable_id,
          classroomid:classroom_id,
          subject:subjectName ,
          day:dayname,
          time:timetime
      });  
        resulttimetable =  await timetable.save();
      }
      else{
        resulttimetable = existingTimetable;
      }
      // const searchTeacherTimetable= await Classroom.find({classroom_id:classroom_id, timetable:{ $in: [resulttimetable[0]._id]}},{})
      // if(searchTeacherTimetable && searchTeacherTimetable.length>0){
      //   updateClassroom = searchTeacherTimetable;
      //   console.log(searchTeacherTimetable,'searchTeacherTimetable')
      // }
      // else{
        updateClassroom = await Classroom.updateOne({classroom_id : classroom_id},{$push:{timetable:resulttimetable}});
      // }
      console.log(updateClassroom,'updateClassroom')

    }catch(e){
     console.log(e);
    }
 }

 const deleteTimeTable = async(req,res,next) =>{
  const timetableId = req.params.timetableId;
  console.log(timetableId,'timetableId')
  try{
  const result = await Timetable.findOneAndDelete({timetable_id:timetableId});
  if(result && result._id && result.classroomid ){
    const classroomresult = await Classroom.updateOne({classroom_id:result.classroomid}, {$pull:{timetable:result._id }});
    console.log(classroomresult,'classroomresult')
    return res.status(200).json({ message:`${timetableId} deleted successfully` });
  }
  }
  catch(err){
    console.log(err)
  }
 };

 module.exports = { createTimeTable ,deleteTimeTable};








      // existingTimetable = await Timetable.find({day:day,time:time ,subject:subjectName, classroomid:classroom_id },{})
      // console.log(existingTimetable,'existingTimetable')
      // if(existingTimetable && existingTimetable.length>0){
      //   return res.status(400).json({message : "this record already exists!"})
      // }
      // else{
      //     const result =  await timetable.save();
      //     if(result){ 
      //       const {_id,day, time, subject, classroomid} = result;
      //       console.log(result,'result')
      //       const updateresult = await Classroom.updateOne({classroom_id : classroomid},{$push:{timetable:result}});
      //       console.log(updateresult,'updateresult')
      //       // const updateresult = await Classroom.updateOne({classroom_id : classroomid},{$set:{timetable:[{day:day, time:time, subject:subject}]}})
      //       if(updateresult){
      //         return res.status(201).json({ result })
      //         }
      //     }
      //   }
      



 
    // if(existingUser){
    //     return res.status(400).json({message : "User is already exists!"})
    // }
    // const hashedPassword = bcrypt.hashSync(password);
    // const user = new User({
    //     name,email,
    //     password: hashedPassword
    // });
 
    // try{
    //     user.save();
    //     return res.status(201).json({ user })
    // }
    // catch(e){console.log(e);}