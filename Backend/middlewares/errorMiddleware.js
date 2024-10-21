class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode=statusCode
    }
}

export  const errorMiddleware=(err,req,res,next)=>{
    err.message=err.message || 'Internal Server Error';
    err.statusCode=err.statusCode || 500;

    if(err.code=== 1000){
        const message=`Dupicate ${Object.keys(err.keyValue)} Entered`;
        err=new ErrorHandler(message,400);
    }
    if(err.name==='JsonWebTokenError'){
        const message="json web token is invalid,Try again";
        err=new ErrorHandler(message,400);
    }
    if(err.name==='CastError'){
        const message=`Invalid ${err.path}`;
        err=new ErrorHandler(message,400);
    }
    if(err.name==='TokenExpiredError'){
        const message=`Json web token is expired,Try again`;
        err=new ErrorHandler(message,400);
    }
    const errorMessage=err.errors ? Object.values(err.errors).map(error=>error.message).join(", "):err.message;
    return res.status(err.statusCode).json({
       success:false,
       message:errorMessage,
    })
}

export default ErrorHandler;