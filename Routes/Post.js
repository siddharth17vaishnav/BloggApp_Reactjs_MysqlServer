const express= require('express');
const router = express.Router();
const {Post,Likes} = require('../models');
const {validateToken}  = require("../middleware/AuthMiddleware");





router.get("/",async (req,res)=>{
    const listofPosts =await Post.findAll({include:[Likes]});
    res.json(listofPosts);

});

router.get('/byId/:id',async(req,res)=>{
    const id = req.params.id;
        const post = await Post.findByPk(id);
        res.json(post);
   
    
});

router.post("/",async (req,res)=>{
    try{
        const {title,desc,username,profile} = req.body;
        console.log(req.body);
       await Post.create({title:title,desc:desc,username:username,profile:profile});
       res.json(post);
       
      
    }
    catch(err){
      
    }
  
});

router.post('/getpostbyusername/',async(req,res)=>{
    const username= req.body.username;
     Post.findAll({where: {username: username}}).then(data=>res.json(data));
});

router.delete("/:postId",validateToken,async (req,res)=>{
    const postId = req.params.postId;

    await Post.destroy({where : {id:postId}});

    res.json("DELETED");

})


module.exports = router;