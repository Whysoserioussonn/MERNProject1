const express = require("express");
const router = express.Router();
const {
  registerUser,
  getMe,
  loginUser,
} = require("../controllers/userController");
const{protect} = require('../middleware/authMiddleware')  

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);    // added protect as a second argument

module.exports = router;
