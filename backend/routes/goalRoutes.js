const express = require("express");
const router = express.Router();
const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController"); // bringing functions from controller and setting it to endpoints /, /:id

const {protect} = require('../middleware/authMiddleware')

//read a goal
// replace 2nd paramater with function getGoals after importing from controllers , test with POSTMAN get request http://localhost:5000/api/goals/
// add protect before the name of the route to protect it, test on postman http://localhost:5000/api/goals/ and send, should get not authorized b/c no token was sent
router.get("/", protect, getGoals);

// create a goal, use post request
router.post("/", protect, setGoal);

//update a goal, use put request with an id as the param , add :id to route
router.put("/:id", protect, updateGoal);

//Delete a goal, use delete request with an id as the param, add :id to route
router.delete("/:id", protect, deleteGoal);

module.exports = router;
