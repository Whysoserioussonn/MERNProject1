const express =  require('express')
const router = express.Router()

//read a goal
router.get('/', (req,res) => {
  res.status(200).json({message: 'Get goals'})
})
// create a goal, use post request
router.post('/', (req,res) => {
  res.status(200).json({message: 'Set goal'})
})

//update a goal, use put request with an id as the param , add :id to route
router.put('/:id', (req,res) => {
  res.status(200).json({message: `Update Goal: ${req.params.id}`})
})

//Delete a goalm use delete request with an id as the param, add :id to route
router.delete('/:id', (req,res) => {
  res.status(200).json({message: `Delete Goal: ${req.params.id}`})
})


module.exports = router