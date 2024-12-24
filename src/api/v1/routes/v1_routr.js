const express = require('express')

const authrouter = require('../userbase/routes/authroute')
const userActivites = require('../userbase/routes/userActivites')
const dbRoutes = require('../userbase/routes/databaseroutes')
const v1Router = express.Router();

v1Router.use('/auth', authrouter);
v1Router.use('/api', userActivites)

v1Router.use('database', dbRoutes)


module.exports = v1Router;