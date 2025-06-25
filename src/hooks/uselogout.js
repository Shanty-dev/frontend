import { useAuthContext } from './useauthcontext'
import { useWorkoutContext } from './useworkoutcontext'

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: workoutDispatch } = useWorkoutContext()

    const logout = () => {
        //remove user from storage

        localStorage.removeItem('user')

        //dispatch logout action
        dispatch({ type: 'LOGOUT' })
        workoutDispatch({ type: 'SET_WORKOUT', payload: null })
    }
    return { logout }
}