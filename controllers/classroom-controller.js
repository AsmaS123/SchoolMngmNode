const  { Classroom, Teacher } = require("../models/model")

const createClassroom = async(req,res,next) =>{
    const { classroom_id , teacher_id , section,grade } = req.body;
    let existingclassroom;
    // console.log(req.body,'req.body')
    const classroom = new Classroom({
        classroom_id: classroom_id,
        teacher_id: teacher_id,
        section:section,
        grade:grade
    });

    try{
       existingclassroom = await Classroom.findOne({ teacher_id:teacher_id,section:section,grade:grade ,classroom_id:classroom_id })
       if(existingclassroom){
            return res.status(400).json({message : "this record already exists!"})
       }
       else{
        const result =  await classroom.save();
        // console.log(result,'result')
        if(result){
            const updateresult = await Teacher.updateOne({teacher_id : teacher_id},{$push:{classroom:result}});
            // console.log(updateresult,'updateresult')
            // const updateresult = await Classroom.updateOne({classroom_id : classroomid},{$set:{timetable:[{day:day, time:time, subject:subject}]}})
            if(updateresult){
              return res.status(201).json({ result })
              }
        }
       }
    }
    catch(e){console.log(e);
        return res.status(400).json({message: "Incorrect data!"});
    }
 }
 
 module.exports = { createClassroom };


  