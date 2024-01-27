import { useAuthContext } from "../hooks/useAuthContext"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

const { useState } = require("react")



const WorkoutForm =()=>{
    const {dispatch}=useWorkoutsContext()
    const {user}=useAuthContext()

    const [title,setTitle]=useState('')
    const [load,setLoad]=useState('')
    const [reps,setReps]=useState('')
    const [error,setError]=useState('')
    const [emptyFields,setEmptyFields]=useState([])

    const handleSubmit=async(e)=>{
        e.preventDefault()

        if(!user){
            setError('You must be logged in')
            return 
        }
        const workout={title,load,reps}
        const response = await fetch('http://localhost:4000/api/workouts/',{
            method: 'POST',
            body : JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
                
            }

        })
        const json=await response.json()
        if (!response.ok){
            console.log(json)
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok){
            console.log(workout)
            setTitle('')
            setLoad('')
            setReps('')
            setError(null);
            setEmptyFields([])
            console.log('new workout added')
            dispatch({
                type: 'CREATE_WORKOUT',
                payload: json
            })
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new workout</h3>

            <label>Exercise Title: </label>
            <input
                type="text"
                onChange={(e)=> setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title')? "error": ''}
                />
            <label>Load (in Kg): </label>
            <input
                type="number"
                onChange={(e)=> setLoad(e.target.value)}
                value={load}
                className={emptyFields.includes('load')? "error": ''}
                />
            <label>Reps: </label>
            <input
                type="number"
                onChange={(e)=> setReps(e.target.value)}
                value={reps}
                className={emptyFields.includes('reps')? 'error': ''}
                />

            <button type="submit">Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WorkoutForm