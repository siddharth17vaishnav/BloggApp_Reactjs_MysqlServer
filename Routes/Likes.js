const express= require('express');
const router = express.Router();
const {Likes} = require('../models');
const {validateToken} = require('../middleware/AuthMiddleware');


router.post('/',validateToken,async(req,res)=>{
    const {PostId} = req.body;
    const id = req.user.id;
 

    try{
        const found = await Likes.findOne({where:{PostId:PostId,UserId:id}});
        if(!found){
            await Likes.create({PostId:PostId,UserId:id});
            res.json({liked:true})
        }
        else{
            await Likes.destroy({where : {PostId:PostId,UserId:id}});
            res.json({liked:false})
        }  
    }
    catch(err){
        res.json(err);
        console.log(err);
    }
});

router.get("/",async (req,res)=>{
    const listofLikes =await Likes.findAll();
    res.json(listofLikes);

});




module.exports = router;