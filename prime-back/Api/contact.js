const express = require("express");
const router = express.Router();
const dontenv = require("dotenv").config();
const nodemailer = require("nodemailer");

router.post("/", async (req, res) => {
  console.log("the comming datas are ", req.body);
  const { email, message } = req.body;

  try {
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: email, // sender address
      to: "bar@example.com, baz@example.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: message, // plain text body
      html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    if (info.messageId) {
      res.status(200).json({ message: "success" });
    } else {
      // res.status(500).json({message: "failed"});
    }
  } catch (err) {
    res.status(500).json({ message: "failed" });
  }
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

  // main().catch(console.error);

  //   try {
  //     let transporter = nodemailer.createTransport({
  //         host: "smtp.ethereal.email",
  //         service: "gmail",
  //         port: 465,
  //         secure: false,
  //       auth: {
  //         user:"Kirubelgirmaye@gmail.com",
  //         pass: "Kirubel@21",
  //       },
  //     });

  //     let mailoptions = {
  //       from: email,
  //       to: "Kirubelgirmaye@gmail.com",
  //       subject: "Feedback",
  //       text: message,
  //     //   template: `index`,
  //       // html:'<a href="localhost:3000/login"> Click here to login </a> ',
  //     };

  //     transporter.sendMail(mailoptions, function (err, data) {
  //       if (err) {
  //         console.log("Error occurs");
  //       } else {
  //         console.log("Email sent !!!");
  //       }
  //     });
  //   } catch (err) {
  //     console.error(err.message);
  //     res.status(500).send("server error");
  //   }
});

module.exports = router;
