import {Message} from '../models/messageSchema.js'
import {catchAsyncErrors} from '../middlewares/catchAsyncError.js'
import ErrorHandler from '../middlewares/errorMiddleware.js'

export const sendMessage=catchAsyncErrors( async (req,res,next)=>{
    const {firstName,lastName,email,phone,message}=req.body;
    if(!firstName ||!lastName || !email || !phone ||!message){
      return next(new ErrorHandler('Please Fill all detail',400))
    }
    
        await Message.create({firstName,lastName,email,phone,message})
        res.status(200).json({
            success:true,
            message:'Message send successfully'
        })
})

export const getAllmessages =catchAsyncErrors(async(req,res,next)=>{
  const message=await Message.find();
  res.status(201).json({
    success:true,
    message
  })
})