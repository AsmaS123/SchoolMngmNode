const  { Subject } = require("../models/model");

const createSubject = async(req,res,next) =>{
    const { subject_id , name , grade, description } = req.body;
    // console.log(req.body,'req.body')
    let existingSubject;
 
    try{
     existingSubject = await Subject.findOne({subject_id})
    }catch(e){
     console.log(e);
    }
 
    if(existingSubject){
        return res.status(400).json({message : "Subject is already exists!"})
    }
    const subject = new Subject({
        subject_id: subject_id,
        name: name,
        grade:grade,
        description:description
    });
    try{
        subject.save();
        return res.status(201).json({ subject })
    }
    catch(e){console.log(e);}
 }
 
 const subjectList = async(req,res,next) =>{
    const { grade } = req.body;
    let subList;
    try{
        subList = await Subject.find({grade: grade },{subject_id:1,name:1,_id:0})
        return res.status(201).json({ subList })
       }catch(e){
        console.log(e);
       }
 }  

 
 module.exports = { createSubject ,subjectList};