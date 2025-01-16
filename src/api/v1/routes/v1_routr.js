const express = require('express')

const authrouter = require('../community/routes/authroute')
const userActivites = require('../community/routes/userActivites')
const dbRoutes = require('../community/routes/databaseroutes')
const googleSheetRoutes = require('../community/routes/googlesheetroute')
const v1Router = express.Router();

v1Router.use('/auth', authrouter);
v1Router.use('/api', userActivites)

v1Router.use('/database', dbRoutes)
v1Router.use('/googlesheet', googleSheetRoutes)


module.exports = v1Router;