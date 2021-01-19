const express = require('express')
const carsRouter = require('./cars-router')
const server = express()

server.use(express.json())

server.use('/api/cars/', carsRouter)

server.get('/', (req, res) => {
        res.status(200).json({message: 'Server is running'})
    })


module.exports = server;