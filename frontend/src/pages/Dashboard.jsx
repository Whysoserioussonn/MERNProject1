import { useEffect } from 'react'                       
import { useNavigate } from 'react-router-dom'        // to redirect user
import { useSelector, useDispatch } from 'react-redux' // to grab user from the state to see if we are logged in or not
import GoalForm from '../components/GoalForm'
// import GoalItem from '../components/GoalItem'
// import Spinner from '../components/Spinner'
// import { getGoals, reset } from '../features/goals/goalSlice'

function Dashboard() {
  const navigate = useNavigate()

  const {user} = useSelector((state) => state.auth)

  useEffect(() => {
    if(!user) {
      navigate('/login')
    }
  }, [user,navigate] )
 
  return (
   <>
    <section className="heading">
      <h1> Welcome {user && user.name}</h1>
      <p>Resolutions Dashboard</p>

    </section>
    <GoalForm />
   </>
  )
}

export default Dashboard