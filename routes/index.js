const router = require("express").Router();
const User = require("../models/User");
// get users

router.get("/user", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ status: true, message: "user list", data: users });
  } catch (error) {
    res.status(500).json({ status: false, message: error });
  }
});

// create user

router.post("/createUser", async (req, res) => {
  try {
    const { FullName, Email } = req.body;
    const userFullName = await User.findOne({ FullName });
    const userEmail = await User.findOne({ Email });

    if (userFullName) {
      res.status(200).json({ status: false, message: "FullName already used" });
    } else if (userEmail) {
      res.status(200).json({ status: false, message: "Email already used" });
    } else {
      const newUser = await User.create({ FullName, Email });
      res
        .status(201)
        .json({ status: true, message: "user created", data: newUser });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: error });
  }
});

// delete user
router.delete("/deleteUser/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id)
        
        if (user) {
            await User.findByIdAndDelete(id)
            res.status(200).json({ status: true, message: "user deleted", data: User });
        }else {
            res.status(404).json({ status: true, message: "user don't exist", data: User });
        }
    }catch (error) {
        res.status(500).json({ status: false, message: error });
      }   
});

// update user information
router.put("/updateUser/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id)
        const { FullName, Email } = req.body;
        const userFullName = await User.findOne({ FullName });
        const userEmail = await User.findOne({ Email });
        if (user) {
              if (userFullName) {
                res.status(200).json({ status: false, message: "FullName already used" });
              } else if (userEmail) {
                res.status(200).json({ status: false, message: "Email already used" });
              } else {
                const updatUser = await User.findByIdAndUpdate(id,{ FullName, Email });
                res
                  .status(201)
                  .json({ status: true, message: "user updated", data: updatUser });
              }
        }else {
            res.status(200).json({ status: true, message: "user don't exist", data: User });  
        }
        
    }catch (error) {
        res.status(500).json({ status: false, message: error });
      }   
});

module.exports = router;
