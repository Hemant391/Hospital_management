import { request } from "express";
import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:[3,'First Name Must contain atleast 3 character']
    },
    lastName:{
        type:String,
        required:true,
        minLength:[3,'Last Name Must contain atleast 3 character']
    },
    email:{
        type:String,
        required:true,
        validate:[validator.isEmail,'Please provide valid email']
    },
    phone:{
        type:Number,
        required:true,
        maxLength:[13,'Phone number not valid'],
        minLength:[10,'Phone number must contain 10 digit']
    },
    nic:{
        type:String,
        required:true,
        maxLength:[13,'Phone number must contain 10 digit'],
    
    },
    dob:{
        type:Date,
        required:true
    },
    gender:{
        type:String,
        required:true,
        enum:['Male','Female'],
    },
    appointment_date:{
        type:Date,
        required:true,

    },
    department:{
        type:String,
        required:true,
    },
    doctor:{
        firstName:{
            type:String,
            required:true,
        },
        lastName:{
            type:String,
            required:true
        },
    },
    hasVisited:{
        type:Boolean,
        default:false,
        
    },
    doctorId:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    patientId:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["Pending","Accepted","Rejected"],
        default:"Pending"
    },
    
});
export const Appointment = mongoose.model("Appointment",appointmentSchema);