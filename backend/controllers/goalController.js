const asyncHandler = require('express-async-handler')   // wrap around each entiere async function
// @ desc Get Goals
// @route GET /api/goals
// @access Private
// when we use mongoose in each the functions to interact with database, we get back a promise, so we gonna use async await
// normally use try catch with async await, but as an alternative we can just use the errorHandler by using a package called Express async Hand
const getGoals = asyncHandler (async (req,res) => {
  res.status(200).json({message: 'Get goals'})
})

// @ desc Set/Create Goal
// @route POST /api/goals
// @access Private
const setGoal = asyncHandler (async (req,res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Pleas add a text field')
  }  
  res.status(200).json({message: 'Set goal'})
})

// @ desc Update Goal
// @route PUT /api/goals/:id
// @access Private
const updateGoal =  asyncHandler (async (req,res) => {
  res.status(200).json({message: `Update Goal: ${req.params.id}`})
})

// @ desc Delete Goal
// @route DELETE /api/goals/:id
// @access Private
const deleteGoal = asyncHandler (async (req,res) => {
  res.status(200).json({message: `Delete Goal: ${req.params.id}`})
})

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal
}