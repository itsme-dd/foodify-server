const User = require("../models/User");
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken");
const jwtSecret=process.env.JWT_SECRET;

router.post(
    "/loginuser",
    [body("email","Invalid email").isEmail(),
    body("password","Inavlid password").isLength({ min: 5 })],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: 'Login with valid credentails'});
      }
      try {
        let email=req.body.email;
        let userData=await User.findOne({email});
        if(!userData)
        return res.status(400).json({ errors: 'Login with valid credentails'});

        const isCompare=await bcrypt.compare(req.body.password,userData.password);
        if(!isCompare)
        return res.status(400).json({ errors: 'Login with valid credentails'});
        const data={
            user:{
                id:userData.id
            }
        }
        const authToken=jwt.sign(data,jwtSecret)
        res.json({ success: true,authToken:authToken});
        

        
      } catch (err) {
       // console.log(err);
        res.json({ success: false });
      }
    }
  );
  module.exports = router;
  