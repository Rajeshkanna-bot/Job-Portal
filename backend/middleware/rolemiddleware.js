const authroles=(req,res,next)=>{

try{
   if(!req.user){
    return res.status(401).json({message:"unauthorized"})
   }
   if(req.user.role =="user"){
    return res.status(403).json({message:"access denied"})
   }
   next();
}catch(error){
    res.status(500).json({message:"Server error"})
}


}


export default authroles;