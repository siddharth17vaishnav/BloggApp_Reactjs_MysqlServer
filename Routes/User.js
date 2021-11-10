const express= require('express');
const router = express.Router();
const {Users} = require('../models');
const bcrypt =require('bcrypt');
const {sign} = require('jsonwebtoken');


router.post("/",async (req,res)=>{
  const {name,email,username,password,mobile,profile}=req.body;
  const type="user";
  const user = await Users.findOne({where: {username: username}});
  if(user){
      res.json("User already exist");
  }
  else{
    bcrypt.hash(password,10).then((hash)=>{
        Users.create({
            name:name,
            email:email,
            username:username,
            password:hash,
            mobile:mobile,
            profile:profile,
            type:type
        });
        res.json("Success");
      });
  }
  

});

router.post('/login',async(req,res)=>{
    const {username,password} = req.body;
    const user = await Users.findOne({where: {username: username}});
    if(!user){
        res.json({error:"User not Found!"});
    }
    bcrypt.compare(password,user.password).then((match)=>{
        if(!match){
            res.json({error:"Incorrect Username or Password"});
        }
        const accessToken = sign({username:user.username,id:user.id},"hkdjfghkdfhgkdhfgiudfgkjdfbgidfh");

        res.json({token:accessToken,username:username,id:user.id,type:user.type});
    })
});

router.post('/profile/',async(req,res)=>{
    const username= req.body.username;
     Users.findAll({where: {username: username}}).then(data=>res.json(data));
});

router.get('/users/',async(req,res)=>{
     Users.findAll().then(data=>res.json(data));
});

router.delete("/:userId",async (req,res)=>{
    const userId = req.params.userId;
   
    await Users.destroy({where : {id:userId}});

    res.json("DELETED");

});

router.put("/makeadmin/:userId",async (req,res)=>{
    const id = req.body.id;
    const type = req.body.type;
    await Users.update({type:type},{where : {id:id}});
    res.json("Updated");

});

router.put("/removeadmin/:userId",async (req,res)=>{
    const id = req.body.id;
    const type = req.body.type;
    await Users.update({type:type},{where : {id:id}});
    res.json("Updated");

});





module.exports = router;