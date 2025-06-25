import { useWorkoutContext } from '../hooks/useworkoutcontext'
import { useAuthContext } from '../hooks/useauthcontext'

//date 
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout }) => {
    const { user } = useAuthContext()
    const { dispatch } = useWorkoutContext()
    const handleClick = async() => {
        if (!user) {
            return
        }

        const response = await fetch('/api/workout/' + workout._id, {
            method: 'Delete',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'DELETE_WORKOUT', payload: json })

        }
    }

    return ( <
        div className = "workout-details" >
        <
        h4 > { workout.title } < /h4> <
        p > < strong > Load(kg): < /strong>{workout.load}</p >
        <
        p > < strong > Number of reps: < /strong>{workout.reps}</p >

        <
        p > { formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true }) } < /p> <
        span className = "material-symbols-outlined"
        onClick = { handleClick } > delete < /span>

        <
        /div>
    )
}

export default WorkoutDetails