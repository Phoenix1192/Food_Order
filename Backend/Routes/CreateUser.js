const express = require("express");
const router = express.Router();
const User = require("../models/User");
// ...rest of the initial code omitted for simplicity.
const { body, validationResult } = require("express-validator");
const jwtsecret = "yiuasauisderwefgwaabfsawbpzdwbg";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// We validate the user entered details 
router.post(
  "/loginuser",
  body("email", "Incorrect Email").isEmail(),
  body("password", "Incorrect Password").isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      //and return error if any
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try {
      let userdata = await User.findOne({ email });
      if (!userdata) {
        return res
          .status(400)
          .json({ errors: "Try loggin in with correct credentials" });
      } else {
        const pwdcompare = bcrypt.compare(req.body.password, userdata.password);
        if (!pwdcompare) {
          return res
            .status(400)
            .json({ errors: "Enter the correct Password" });
        }
      }
      const data = {
        user: {
          id: userdata.id,
        },
      };
      const authtoken = jwt.sign(data, jwtsecret);

      res.json({ sucess: true, authtoken: authtoken });
    } catch (err) {
      res.json({ sucess: false, error: err });
    }
  }
);

router.post(
  "/createuser",

  body("email", "Incorrect Email").isEmail(),
  body("password", "Incorrect Password").isLength({ min: 5 }),
  body("name", "Short Name").isLength({ min: 5 }),
  async (req, res) => {
    // console.log("Consiligerreh")
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // console.log(req)
      return res.status(400).json({ errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10);
    let secpassword = await bcrypt.hash(req.body.password, salt);
    try {
      User.create({
        name: req.body.name,
        password: secpassword,
        email: req.body.email,
        location: req.body.location,
      });
      res.json({ sucess: true });
    } catch (err) {
      res.json({ sucess: false, error: err });
    }
  }
);

module.exports = router;
