import jwt from "jsonwebtoken"
import dontenv from 'dotenv'

dontenv.config()

export const verifytoken=(req,res,next)=>{
    try{
       const authHeader=req.headers.authorization;
       if(!authHeader){
      return  res.status(401).json({message:"No token provided"})
       }
       const token=authHeader
       const decoded=jwt.verify(token,process.env.JWT_SECRET)
       console.log(decoded);
       
       req.user=decoded;

    next();
    }catch(error){
        res.status(401).json({message:"Invalid token",error})
    }
}