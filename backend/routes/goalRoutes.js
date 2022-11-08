const express =  require('express')
const router = express.Router()
const {getGoals, setGoal, updateGoal, deleteGoal}= require('../controllers/goalController')  // bringing functions from controller and setting it to endpoints /, /:id


//read a goal
// router.get('/', (req,res) => {
//   res.status(200).json({message: 'Get goals'})
// })
// replace 2nd paramater with function getGoals after importing from controllers , test with POSTMAN get request http://localhost:5000/api/goals/
router.get('/', getGoals)

// create a goal, use post request
router.post('/', setGoal)

//update a goal, use put request with an id as the param , add :id to route
router.put('/:id', updateGoal)

//Delete a goal, use delete request with an id as the param, add :id to route
router.delete('/:id', deleteGoal)


module.exports = router