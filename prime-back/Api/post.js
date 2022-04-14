const express = require("express");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const auth = require("../middleware/auth");
const Post = require("../Models/post");

const multer = require("multer");
const post = require("../Models/post");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4()+file.originalname);
  },
});

const upload = multer({ storage: storage });

//auth middle ware should be added later

router.post("/", auth, upload.any("itemImage"), async (req, res) => {
  console.log("the comming datas are ", req.body);
  console.log("the req.user value is ", req.user);

  const {
    location,
    availableUnits,
    progress,
    delivery,
    paymentPlan,
    description,
    image1,
    image2,
    image3,
    image4,
  } = req.body;

  const obj = {
    location,
    availableUnits,
    progress,
    delivery,
    paymentPlan,
    description,
  };
  if (req.files[0]) {
    obj.image1 = req.files[0].path;
  }
  if (req.files[1]) {
    obj.image2 = req.files[1].path;
  }
  if (req.files[2]) {
    obj.image3 = req.files[2].path;
  }
  if (req.files[3]) {
    obj.image4 = req.files[3].path;
  }

  console.log("the obj total value is ", obj);
  const newpost = new post(obj);
  await newpost.save();
  res.status(200).json({ message: "Post Successfuly added !" });
});

router.get("", async (req, res) => {
  const allPosts = await Post.find().sort("-createdAt");
  res.json({ status: "Data fetched", data: allPosts });
});

router.get("/:id", async (req, res) => {
  const getone = req.params.id;
  // var objectId = mongoose.Types.ObjectId(postId);
  // console.log("the postId value is ", objectId);
  try {
    const singlepost = await Post.findById(getone);
    if (singlepost) {
      res.json({ status: "successful fetch one post" , data: singlepost});
    } else {
      res.json({ status: "failed" });
    }
  } catch (err) {
    console.error(err);
  }
});


router.delete("/:id", async (req, res) => {
  const postId = req.params.id;
  console.log("the postId value is ", postId);
    var objectId = mongoose.Types.ObjectId(postId);
    console.log("object id value is ", objectId)

  try {
    await Post.findByIdAndDelete(objectId)
    // if (deletedPost) {
      res.json({ status: "successfuly deleted your post" });
    // } else {
    //   res.json({ status: "failed" });
    // }
  } catch (err) {
    console.error(err);
    res.json({ status: "error occured while deleting your post" });

  }
});

module.exports = router;
