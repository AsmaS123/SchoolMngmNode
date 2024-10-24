const User = require("../models/User");

const authenticate= require("../middleware/authenticate ");
const  {Teacher, Classroom ,Timetable} = require("../models/model")
const bcrypt = require("bcryptjs");
const logger = require("../middleware/loger");

const getAllTeacher = async(req,res,next) =>{
    let teachers;
    let token;
        try{
            teachers = await Teacher.find()
        }
        catch(err){
            logger.log(err);
        }
        if(!teachers){
            return res.status(404).json({ message : "Teacher are not found"})
        }
    
        return res.status(200).json({teachers});
}

const getAllTeachersList = async(req,res,next) =>{
    let teachers;

    try{
        teachers = await Teacher.find({},{teacher_id:1,name:1,_id:0})
    }
    catch(err){
        console.log(err);
        return res.status(400).json({message: "Incorrect data!"});
    }
    return res.status(200).json({teachers});
}



const logIn = async(req,res,next) => {
    const {email , password} = req.body;
    
    let existingUser;

    try{
     existingUser = await User.findOne({email})
    }catch(e){
     console.log(err);
    }
    if(!existingUser){
        return res.status(404).json({message : "User is not found"})
    }

    const isPasswordCorrect = bcrypt.compareSync(password,existingUser.password);

    if(!isPasswordCorrect){
        return res.status(400).json({message: "Incorrect Password!"});
    }

    return res.status(200).json({user: existingUser});
}


const createTeacher = async(req,res,next) =>{
    const { email ,name,gender,address,phone,date_of_join, dob } = req.body;
    let existingTeacher;
    const teacher_id = Math.floor(Math.random() * 100000);
    const teacher = new Teacher({
        teacher_id: teacher_id,
        email: email,
        name:name,
        gender:gender,
        address:address,
        phone:phone,
        date_of_join:date_of_join,
        dob:dob,
        
    });

    try{
        existingTeacher = await Teacher.findOne({ teacher_id:teacher_id  })
       if(existingTeacher){
            return res.status(400).json({message : "this record already exists!"})
       }
       else{
        const result =  await teacher.save();
        if(result){
         return res.status(201).json({ result })
        }
       }
    }
    catch(e){console.log(e);
        return res.status(400).json({message: "Incorrect data!"});
    }
 }
 
 
const updateTeacher = async(req,res,next) =>{
    const { email ,name,gender,address,phone,date_of_join, dob,teacher_id } = req.body;
    // console.log(req.body,'req.body')
    try{
        const result =  await Teacher.updateOne({teacher_id: teacher_id,},{$set: {    
            email: email,
            name:name,
            gender:gender,
            address:address,
            phone:phone,
            date_of_join:date_of_join,
            dob:dob}})
        return res.status(200).json({ result })
       }
    catch(e){
        console.log(e);
        return res.status(400).json({message: "Incorrect data!"});
    }
 }
 

 const getAllTeachersTimetable = async(req,res,next) =>{
    let teachers;
    let result = [];

    try{
        // teachers = await Teacher.find({},{name:1,email:1,classroom:1,_id:0, teacher_id:1});
        // for (k of teachers){
        //     result.push({name: k.name,email: k.email, classroom:[], teacher_id:k.teacher_id})
        // }
        // if(teachers){
        //     for (i in teachers){
        //         const temp = teachers[i].classroom;
        //         if(temp.length>0){
        //             for (j of temp){
        //                 const temp = j &&  await Classroom.find({_id: j},{section:1, grade:1, timetable:1,_id:0,classroom_id:1});
        //                 if(temp.length>0){
        //                     for(let m in temp){
        //                         result[i].classroom.push({timetable: [],grade: temp[m].grade,  section: temp[m].section, classroom_id:temp[m].classroom_id});
        //                         if((temp[m].timetable).length>0){
        //                             for(let l of (temp[m].timetable)){
        //                                 // console.log(l,'l')
        //                                 const time = l && await Timetable.find({_id:l},{ timetable_id: 1, day:1, time:1, subject:1, _id:0})
        //                                 // console.log(time,'time');
        //                                 result[i].classroom[m].timetable = [...result[i].classroom[m].timetable, ...time]
        //                             }
        //                         }
        //                     }
        //                 }
        //                 else{

        //                 }
        //             }
        //         }
        //     }
        // }

        const lookupresult = await Teacher.aggregate([
            {
                $project: {
                    name: 1,
                    email: 1,
                    teacher_id: 1,
                    classroom: 1 // Assuming `classroom` is an array of classroom IDs
                }
            },
            {
                $lookup: {
                    from: 'classrooms', // The name of the classrooms collection
                    localField: 'classroom', // Field from the Teacher collection
                    foreignField: '_id', // Field from the Classroom collection
                    as: 'classroomDetails'
                }
            },
            {
                $unwind: {
                    path: '$classroomDetails',
                    preserveNullAndEmptyArrays: true // To keep teachers without classrooms
                }
            },
            {
                $lookup: {
                    from: 'timetables', // The name of the timetable collection
                    localField: 'classroomDetails.timetable', // Field from classroomDetails
                    foreignField: '_id', // Field from the Timetable collection
                    as: 'classroomDetails.timetableDetails'
                }
            },
            {
                $project: {
                    name: 1,
                    email: 1,
                    teacher_id: 1,
                    classroom: {
                        section: '$classroomDetails.section',
                        grade: '$classroomDetails.grade',
                        classroom_id: '$classroomDetails.classroom_id',
                        timetable: '$classroomDetails.timetableDetails'
                    }
                }
            },
            {
                $group: {
                    _id: '$teacher_id',
                    name: { $first: '$name' },
                    email: { $first: '$email' },
                    classroom: { $push: '$classroom' }
                }
            },
            {
                $project: {
                    _id: 0,
                    name: 1,
                    email: 1,
                    classroom: 1,
                    teacher_id: '$_id'
                }
            }
        ]);
        
        console.log(lookupresult);

        return res.status(200).json({ lookupresult });
    }

    catch(err){
        console.log(err);
        return res.status(400).json({message: "Incorrect data!"});
    }
    return res.status(200).json({teachers});
}




module.exports = { getAllTeacher , logIn,getAllTeachersList,createTeacher,getAllTeachersTimetable,updateTeacher};



// const signUp = async(req,res,next) =>{
//    const { name , email , password } = req.body;

//    let existingUser;

//    try{
//     existingUser = await User.findOne({email})
//    }catch(e){
//     console.log(err);
//    }

//    if(existingUser){
//        return res.status(400).json({message : "User is already exists!"})
//    }
//    const hashedPassword = bcrypt.hashSync(password);
//    const user = new User({
//        name,email,
//        password: hashedPassword,
//        blogs: []
//    });

//    try{
//        user.save();
//        return res.status(201).json({ user })
//    }
//    catch(e){console.log(e);}
// }