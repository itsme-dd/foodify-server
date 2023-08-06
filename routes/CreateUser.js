const User = require("../models/User");
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const bcrypt=require("bcryptjs")

router.post(
  "/createuser",
  [body("email","Invalid email").isEmail(),
  body("name","Invalid Name").isLength({ min: 5 }),
  body("password","Inavlid password").isLength({ min: 5 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(req.body.password,salt);

    try {
      await User.create({
        name: req.body.name,
        location: req.body.location,
        email: req.body.email,
        password: hashedPassword,
      });
      res.json({ success: true });
    } catch (err) {
      //console.log(err);
      res.json({ success: false });
    }
  }
);
module.exports = router;
