const express = require('express')
const db = require('../data/db-config')
const { disabled } = require('./server')
const router = express.Router()


router.get('/', (req, res) => {
    db.select("*")
    .from('cars')
    .then(cars => {
        res.status(200).json(cars);
    })
    .catch(err => {
        res.status(500).json({message: 'Failed to retrieve cars'})
    })
})

router.get('/:id', (req, res) => {
    const {id} = req.params
    db.select("*")
    .from('cars')
    .where('id','=',id)
    .first()
    .then(cars => {
        res.status(200).json({data: cars})
    })
    .catch(err => {
        res.status(500).json({message: 'Failed to retrieve car info'})
    })
})
router.post('/', (req, res) => {
    const carData = req.body
    db('cars')
    .insert(carData, 'id')
    .then(carids => {
        db('cars')
        .where({id: carids[0]})
        .first()
        .then(cars => {
            res.status(200).json({data: cars})
        })
    })
    .catch(err => {
        res.status(500).json(err)
    })
})
router.put('/:id', (req, res) => {
    const {id} = req.params
    const changes = req.body

    db('cars')
    .from('cars')
    .update(changes)
    .then((count => {
        if (count > 0){
            res.status(200).json({data: count})
        }else{
            res.status(404).json({message: 'there was no record to update'})
        }
    }))
    .catch(err => {
        res.status(500).json(err)
    })
})
router.delete('/', (req, res) => {
    const {id} = req.params
    db('cars')
    .from ('cars')
    .where({id})
    .del()
    .then(count => {
        if (count > 0){
            res.status(200).json({data: count})
        }else{
            res.status(404).json({message: 'there was not record to delete'})
        }
    })
    .catch(err => {
        res.status(500).json({message: 'Failed to delete'})
    })
})


module.exports = router;