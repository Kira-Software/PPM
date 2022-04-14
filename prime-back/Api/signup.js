const express = require("express");
// const routehandlers = require("../routehandler");
const { check, validationResult } = require("express-validator");
const User = require("../Models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post(
  "/",
  [
    check("email", "Email is required").not().isEmpty(),
    check(
      "password",
      "password should be present and a length of minimum 6"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        errors = [{ msg: "this user is already exists" }];
        res.status(400).json({ errors: errors });
      } else {
        user = new User({
          email,
          password,
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // user={...user,"age":`${Date.now()} - ${birthdate}`}
        //  console.log("the age of the user is ",Date.now() -  user.birthdate );

        const saveduser = await user.save();

        const payload = {
          user: {
            id: saveduser._id,
          },
        };

        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: 360000 },
          (err, token) => {
            if (err) throw err;
            res.json({
              message: "token genetated successfully",
              token: token,
            });
          }
        );
      }

      // console.log(req.body);
      // res.send("User is registerd successfully");
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: "server error", message: err });
    }
  }
);

module.exports = router;
