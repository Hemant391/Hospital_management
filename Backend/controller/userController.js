import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import {generateToken} from '../utils/jwtToken.js';
import cloudinary from 'cloudinary'

export const patientRegister=catchAsyncErrors(async(req,res,next)=>{
    const {firstName,lastName,email,phone,password,gender,nic,dob,role="Patient"}=req.body;
    if(!firstName||!lastName||!email||!phone||!password||!gender||!nic||!dob||!role){
        return next(new ErrorHandler("please provide all detail",400));
    }
    let user = await User.findOne({email});

    if(user){
        return next(new ErrorHandler('User already registered! saklsdf',400));
    }
    
    user=await User.create({firstName,lastName,email,phone,password,gender,nic,dob,role});
    generateToken(user,"user Registered!",200,res)
    
})


export const login =catchAsyncErrors(async(req,res,next)=>{
    const {email, password,confirmPassword,role}=req.body;
    if(!email ||!password || !confirmPassword ||!role){
        return next(new ErrorHandler('Fill all details',400))
    }
    if(password!==confirmPassword){
        return next(new ErrorHandler("Password and confirm password doesn't match"))
    }

    const user=await User.findOne({email}).select("+password");
   
    if(!user){
        return next(new ErrorHandler("Doesn't find the user",400))
    }
    
    const isPasswordmatch= await user.comparePassword(password);
    if(!isPasswordmatch){
        return next(new ErrorHandler("Invalid password and email",400))
    }

    if(role!=user.role){
        return next(new ErrorHandler('User with this role not found',400))
    }
    generateToken(user,"user Login successfully!",200,res)
    
})


export const addNewAdmin=catchAsyncErrors(async(req,res,next)=>{
    const {firstName,lastName,email,phone,password,gender,nic,dob}=req.body;
    if(!firstName||!lastName||!email||!phone||!password||!gender||!nic||!dob){
        return next(new ErrorHandler("please provide all detail",400));
    }

const isAlreadyRegister=await User.findOne({email});
if(isAlreadyRegister)return next(new ErrorHandler("admin already exist"))

    const admin =await User.create({
        firstName,lastName,email,phone,password,gender,nic,dob,role:"Admin"
    });
    res.status(200).json({
        success:true,
        message:"New admin register successfully"
    })

})

export const getAllDoctores=catchAsyncErrors(async(req,res,next)=>{
    const doctors= await User.find({role:"Doctor"})
    res.status(200).json({
        success:true,
        doctors,
    })
})

export const getUserDetails = catchAsyncErrors(async(req,res,next)=>{
    const user=req.user;
    res.status(200).json({
        success:true,
        user,
    });
})


export const logoutAdmin = catchAsyncErrors (async(req,res,next)=>{
    res.status(200).cookie('adminToken',"",{
        httpOnly: true,
        expires:new Date(Date.now()),
    }).json({
        success:true,
        message:'Log out sucessfully!'
    })
})
export const logoutPatient = catchAsyncErrors (async(req,res,next)=>{
    res.status(200).cookie('patientToken',"",{
        httpOnly: true,
        expires:new Date(Date.now()),
    }).json({
        success:true,
        message:'Log out sucessfully!'
    })
})

export const addNewDoctor= catchAsyncErrors(async(req,res,next)=>{
    if(!req.files || Object.keys(req.files).length===0){
        return next(new ErrorHandler("Doctor imgage required",400));
    }
    const {docAvatar}=req.files;
    const allowedFormats=['image/png','image/jpeg','image/webp'];
    if(!allowedFormats.includes(docAvatar.mimetype)){
        return next(new ErrorHandler('File format should be png,jpeg,webp ',400))
    }
    const{
        firstName,lastName,email,phone,password,gender,nic,dob,doctorDepartment
    }=req.body;
    if(!firstName||!lastName||!email||!phone||!password||!gender||!nic||!dob || !doctorDepartment){

        return(next(new ErrorHandler("Please provide full Details!",400)))
    }
    const isRegisterd=await User.findOne({email});
    if(isRegisterd){
        return next(new ErrorHandler('Email is already registered'))
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(
        docAvatar.tempFilePath
    )
    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.log('Cloudinary Error: ',cloudinaryResponse.error || "Unknown Cloudinary Error");
    
    }
    const doctor = await User.create({
        firstName,lastName,email,phone,password,gender,nic,dob,doctorDepartment,role:'Doctor',docAvatar:{
            public_id:cloudinaryResponse.public_id,
            url:cloudinaryResponse.secure_url,
        },
    });
    res.status(200).json({
        success:true,
        message:"New Doctor Registered!",
        doctor
    })
})