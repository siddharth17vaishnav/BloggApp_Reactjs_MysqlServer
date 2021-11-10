const {verify} = require('jsonwebtoken');

const validateToken = (req,res,next)=>{
    const accessToken = req.header("accessToken");

    if(!accessToken){
        return res.json({error:"User not logged in!"});
    }
   
    try{
        const validToken = verify(accessToken,"hkdjfghkdfhgkdhfgiudfgkjdfbgidfh");
        req.user = validToken;
        if(validToken){
        return next(); 
        }
 }
         catch(err){
          res.json({error:"User is not Authenticated"});
        }
}

module.exports ={validateToken};