import multer from "multer";

const storage=multer.diskStorage({
    distination:function(file,req,cb){
        cb(null,"uploads/")
    },
    filename:function(file,req,cb){
        cb(null,Date.now()+"-"+ file.originalname)
    },
})

const upload=multer({storage})

export default upload;