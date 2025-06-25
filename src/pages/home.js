import { useEffect } from "react"
import { useWorkoutContext } from "../hooks/useworkoutcontext"
import { useAuthContext } from '../hooks/useauthcontext'
// components
import WorkoutDetails from "../components/workoutdetails"
import WorkoutForm from "../components/workoutform"



const Home = () => {
    const { workout, dispatch } = useWorkoutContext()
    const { user } = useAuthContext()

    useEffect(() => {
        const fetchWorkouts = async() => {
            const response = await fetch('/api/workout', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'SET_WORKOUT', payload: json })
            }
        }
        if (user) {
            fetchWorkouts()

        }

    }, [dispatch, user])
    return ( <
        div className = "home" >
        <
        div className = "workouts" > {
            workout && workout.map((workout) => ( <
                WorkoutDetails key = { workout._id }
                workout = { workout }
                />
            ))
        } <
        /div> <
        WorkoutForm / >
        <
        /
        div >
    )
}

export default Home