const Workout = require('../models/workoutmodel')
const mongoose = require('mongoose')

//get all workout
const getworkouts = async(req, res) => {
    const user_id = req.user._id
    const workout = await Workout.find({ user_id }).sort({ createdAt: -1 })
    res.status(200).json(workout)
}

//get A single workout
const getworkout = async(req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such Workout' })
    }

    const workout = await Workout.findById(id)
    if (!workout) {
        return res.status(404).json({ error: ' NO Such workout ' })
    }
    res.status(200).json(workout)

}

//create workout
const createworkout = async(req, res) => {
        const { title, load, reps } = req.body

        let emptyFields = []
        if (!title) {
            emptyFields.push('title')
        }
        if (!load) {
            emptyFields.push('load')
        }
        if (!reps) {
            emptyFields.push('reps')
        }
        if (emptyFields.length > 0) {
            return res.status(400).json({ error: 'Please fill in all Fields', emptyFields })
        }
        // add  doc to db

        try {
            const user_id = req.user._id
            const workout = await Workout.create({ title, load, reps, user_id })
            res.status(200).json(workout)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
    //delete workout
const deleteworkout = async(req, res) => {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'NO such workout id' })
        }
        const workout = await Workout.findOneAndDelete({ _id: id })
        if (!workout) {
            return res.status(404).json({ error: 'NO such workout' })
        }
        res.status(200).json(workout)

    }
    //update workout
const updateworkout = async(req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'NO such workout id' })
    }
    const workout = await Workout.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!workout) {
        res.status(404).json({ error: 'NO such workout' })
    }
    res.status(200).json(workout)

}

module.exports = {
    createworkout,
    getworkouts,
    getworkout,
    deleteworkout,
    updateworkout
}