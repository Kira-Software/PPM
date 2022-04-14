const express = require("express");
const router = express.Router();
// const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const User = require("../Models/user")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const auth = require("../middleware/auth");

dotenv.config();

router.get("/", auth, async (req, res) => {
  /////// auth will be added as a middleware
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: "there is a problem on the server",
    });
  }
});

router.post(
  "/",
  [
    check("email", "Email is required").not().isEmpty(),
    check("password", "password should be present ").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    // console.log("the errors of validation result is",errors);

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        res.status(400).json({ errors: [{ msg: "User doesn't exist" }] });
      } else {
        console.log("user found");
        const ismatch = await bcrypt.compare(password, user.password);

        if (!ismatch) {
          // res.status(400).json({ errors: [{ msg: "Password doesn't match" }] });
          return;
        } else {
          console.log("password is match");
          const payload = {
            user: {
              id: user._id,
              //   email: user.email,
              //   job: user.job,
              //   gender: user.gender,
              //   birthdate: user.birthdate,
            },
          };

          console.log("the value of payload in the middleware is ", payload);

          jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 360000 },
            (err, token) => {
              if (err) {
                throw err;
              } else {
                // req.session.token = token; // Auto saves session data in mongo store
                res.json({
                  message: "token genetated successfully",
                  token: token,
                });
              }
            }
          );
        }
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
