const express = require('express');
const router=express.Router();
const User=require('../models/User')
const { body, validationResult } = require('express-validator');
const { findOne } = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middlewares/fetchuser');


const JWT_SEC="imbhaskar@";

// Route 1: Creating a user POST "/api/auth/createuser" Creating a user  No login required
router.post('/createuser',[
    body('name','Enter a valid name').isLength({ min: 3 }),
    body('password', 'Password should be atleast 6 characters').isLength({ min: 6 }),
    body('email', 'Enter a valid email').isEmail(),
],async(req,res)=>{
    //Checking if there are some validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
        let success=false;
        //Checking if a user with same email already exists
        let user=await User.findOne({email : req.body.email})
        if(user)
        {
            return res.status(400).json({success,error:"Sorry a user with same email address already exsitis"})
        }

        //encrypting the password
        const salt = bcrypt.genSaltSync(10);
        const secPass = bcrypt.hashSync(req.body.password, salt);


        //Creating the user
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
          });


          //generating a token for the user according to the user id
          const data={
            user:{
                id : user.id
            }
          }
          const token = jwt.sign(data, JWT_SEC);
        //   console.log(token);
        success=true;
        res.json({success,token})

        
    } catch (error) {
        //if some error occured during try
        res.status(500).send("Internal Server Error")
    }

})

// Route 2: Authenticating a user POST "/api/auth/login" Creating a user  No login required
router.post('/login',[
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Passwod cannot be blan').exists(),
],async(req,res)=>{
    //Checking if there are some validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let success=false;
    const {email,password}=req.body;
    try {
        //checking the email
        let user = await User.findOne({email});
        if(!user)
        {
            return res.status(400).json({success,error:"Please try to enter with correct Credentials"});
        }

        //comparing the passwords 
        const passwordCompare = await bcrypt.compare(password,user.password);
        if(!passwordCompare)
        {
            return res.status(400).json({error:"Please try to enter with correct Credentials"});
        }
         //generating a token for the user according to the user id
         const data={
            user:{
                id : user.id
            }
          }
          const token = jwt.sign(data, JWT_SEC);
          success=true;
        res.json({success,token})
        

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }

})

// Route 3: Getting loggedin user details using POST "/api/auth/getuser"  Login required
router.post('/getuser',fetchuser,async(req,res)=>{
    try {
        let userId=req.user.id;
        const user=await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})




module.exports=router