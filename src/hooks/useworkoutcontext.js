import { WorkoutContext } from '../context/workoutcontext'
import { useContext } from 'react'

export const useWorkoutContext = () => {
    const context = useContext(WorkoutContext)

    if (!context) {
        throw Error('useworkoutContext must be uesd inside an WorkoutContextPRovider')
    }
    return context
}