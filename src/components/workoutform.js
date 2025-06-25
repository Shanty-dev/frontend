import { useState } from 'react'
import { useWorkoutContext } from "../hooks/useworkoutcontext"
import { useAuthContext } from '../hooks/useauthcontext'



const WorkoutForm = () => {
    const { dispatch } = useWorkoutContext()
    const { user } = useAuthContext()
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setemptyFields] = useState([])

    const handleSubmit = async(e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be loged in')
            return
        }

        const workout = { title, load, reps }
        const response = await fetch('/api/workout', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`

            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setemptyFields(json.emptyFields)
        }
        if (response.ok) {
            setError(null)
            setemptyFields([])
            setTitle('')
            setLoad('')
            setReps('')
            console.log('new workout added:', json)
            dispatch({ type: 'CREATE_WORKOUT', payload: json })
        }

    }

    return ( <
        form className = "create"
        onSubmit = { handleSubmit } >
        <
        h3 > ADD a New workout < /h3> <
        label > Excersize Title: < /label> <
        input type = "text"
        onChange = {
            (e) => setTitle(e.target.value)
        }
        value = { title }
        className = { emptyFields.includes('title') ? 'error' : '' }
        />


        <
        label > Load( in kG: ) < /label>  <
        input type = "number"
        onChange = {
            (e) => setLoad(e.target.value)
        }
        value = { load }
        className = { emptyFields.includes('load') ? 'error' : '' }
        />

        <
        label > Reps < /label>

        <
        input type = "number"
        onChange = {
            (e) => setReps(e.target.value)
        }
        value = { reps }
        className = { emptyFields.includes('reps') ? 'error' : '' }
        /> <
        button > ADD Workout < /button>  {
        error && < div className = "error" > { error } < /div>} < /
        form >
    )
}
export default WorkoutForm