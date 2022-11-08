// We have our functions in the controller : getGoals which just fetches them from MongoDO using mongoose, setGoal, updateGoal,deleteGoal


const asyncHandler = require('express-async-handler')   // wrap around each entiere async function

const Goal = require('../models/goalModel')

// @ desc Get Goals
// @route GET /api/goals
// @access Private
// when we use mongoose in each the functions to interact with database, we get back a promise, so we gonna use async await
// normally use try catch with async await, but as an alternative we can just use the errorHandler by using a package called Express async Hand
const getGoals = asyncHandler (async (req,res) => {
  const goals = await Goal.find()

  res.status(200).json(goals)
})

// @ desc Set/Create Goal
// @route POST /api/goals
// @access Private
const setGoal = asyncHandler (async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Pleas add a text field')
  }  

  const goal = await Goal.create({
    text: req.body.text,
  })

  res.status(200).json(goal)
})

// @ desc Update Goal
// @route PUT /api/goals/:id
// @access Private
const updateGoal =  asyncHandler (async (req,res) => {
  const goal = await Goal.findById(req.params.id)

  if(!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
  res.status(200).json(updatedGoal)
})

// @ desc Delete Goal
// @route DELETE /api/goals/:id
// @access Private
const deleteGoal = asyncHandler (async (req,res) => {
  const goal = await Goal.findById(req.params.id)

  if(!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }
  await goal.remove()
  res.status(200).json({id: req.params.id})
})

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal
}