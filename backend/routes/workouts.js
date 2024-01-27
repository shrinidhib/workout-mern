const express=require('express')
const {createWorkout, getWorkout,getWorkouts,deleteWorkout,updateWorkout
}=require('../controllers/workoutController')
const requireAuth=require('../middleware/requireAuth')

const router=express.Router()

//middle for authorisation
router.use(requireAuth)


router.get('/',getWorkouts)

router.get('/:id',getWorkout)
router.post('/', createWorkout)
router.delete('/:id',deleteWorkout)
router.patch('/:id',updateWorkout)

module.exports=router