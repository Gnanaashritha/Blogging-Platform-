const express = require('express')
const { handleMyPost } = require('../controllers/dashboard.controller')
const { JwtValidation } = require('../middleware/jwtValidation.middleware')
const dashroute = express.Router()

dashroute.get('/mypost/:id',JwtValidation,handleMyPost)

module.exports = dashroute
