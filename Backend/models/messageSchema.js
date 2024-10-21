
import mongoose from "mongoose";
import validator from 'validator';

const messageSchema=new mongoose.Schema({
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
        type:String,
        required:true,
        maxLength:[10,'Phone number must contain 10 digit'],
        minLength:[10,'Phone number must contain 10 digit']
    },
    message:{
        type:String,
        required:true,
        minLength:[4,'Message contain 10 word min']
    }
    
});
export const Message=mongoose.model('Message',messageSchema);