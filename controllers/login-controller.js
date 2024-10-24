const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const User = require("../models/User");

const logIn = async(req,res,next) => {
    const {email , password} = req.body;
    
    let existingUser;
    let token
    let passwords = password;
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
    if(existingUser){
        // console.log(process.env.SECRET_KEY,'SECRET_KEY')
        token = await tokenGenerate(existingUser,passwords);
        // const result = await User.updateOne({_id:existingUser._id},{$set:{tokens:[{token:token}]}});
        // console.log(result,'result')
        // token = jwt.sign({ id: existingUser._id,email: existingUser.email }, process.env.SECRET_KEY);
    }
    return res.status(200).json({email: existingUser.email,token:token, roles:['admin']});
}


const generateToken = async(req,res,next) => {
    const {email , password} = req.body;
    let existingUser;
    let token
    let psw = password;
    try{
     existingUser = await User.findOne({email})
    //  token = jwt.sign({ id: existingUser._id,email: existingUser.email }, process.env.SECRET_KEY);   
     token = await tokenGenerate(existingUser,psw)
     return res.status(200).json({token:token})
    }catch(e){
     console.log(err);
    }
}

async function tokenGenerate(existingUser,password){
    // existingUser = await User.findOne({email})
    // console.log(password,'password');
    // const expirationTime = Math.floor(Date.now() / 1000) + 15 * 60;
    const token =  jwt.sign({ email: existingUser.email,password:password }, process.env.SECRET_KEY,{expiresIn: "900s"});
    return token
}

const validateToken = async(req,res,next) => {
    const {token ,email, password} = req.body;
    const decoded = await tokenVerify(token);
    if(decoded.email == email && decoded.password == password){
        return res.status(200).json({status:'valid',message:'token validated'})
    }
    else{
        return res.status(200).json({status:'invalid',message:'token is not valid'})
    }
}

async function tokenVerify(token){
    try{
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        // console.log(decode,'decode')
        return decode;
    }   
    catch(err){
        return err;
    }
   
}

module.exports = { logIn, generateToken, validateToken ,tokenVerify};






   // const options= {
    //     token: token,
    //     password: password,
    //     secretKey: 
    // }
    // jwt.verify(token, process.env.SECRET_KEY,(err, decoded) => {
    //     if (err) {
    //         console.error('Token verification failed:', err);
    //     } else {
    //         console.log('Decoded token payload:', decoded);
    //     }
    // });

    // jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    //     if (err) return res.sendStatus(403); // Invalid token
    
    //     req.user = user; // Attach user info to request
    //     next(); // Proceed to next middleware or route handler
    //   });