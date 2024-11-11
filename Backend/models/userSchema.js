
import mongoose from "mongoose";
import validator from 'validator';
import bycrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const userSchema=new mongoose.Schema({
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
        maxLength:[11,"phone number can't me more than 11 digit"],
        minLength:[10,'Phone number must contain atleast 10 digit']
    },
    nic:{
        type:String,
        required:true,
        maxLength:[15,'nic number atmost 15 digit'],
        minLength:[6,'nic number must contain 6 digit']
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
    password:{
        type:String,
        minLength:[6,"password lenght not less than 6"],
        required:true,
        select:false,
    },
    role:{
        type:String,
        required:true,
        enum:['Admin',"Patient","Doctor"]
    },
    doctorDepartment:{
        type:String
    },
    docAvatar:{
        public_id:String,
        url:String,
    },
    
    
});

userSchema.pre('save',async function (next) {
    if(!this.isModified("password")){
        next();
    }    
    this.password= await bycrypt.hash(this.password,10)
});

userSchema.methods.comparePassword = async function (enterPass) {
    return await bycrypt.compare(enterPass,this.password);
}

userSchema.methods.generateJsonWebToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRES,
    })
}

export const User=mongoose.model('User',userSchema);