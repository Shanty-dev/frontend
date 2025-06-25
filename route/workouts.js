const express = require('express');

const {
    createworkout,
    getworkouts,
    getworkout,
    deleteworkout,
    updateworkout
} = require('../controler/workoutcontroler')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()
    // require auth forr all workout routes
router.use(requireAuth)


//get all workout
router.get('/', getworkouts)
    //get a single workout
router.get('/:id', getworkout)
    //post workout
router.post('/', createworkout)

//delete post workout
router.delete('/:id', deleteworkout)
    //UPdate workout
router.patch('/:id', updateworkout)


module.exports = router