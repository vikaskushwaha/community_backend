require('./src/database/db_config')
const express = require('express')
const { createRegisteredUserTable, insertUserDetails, insertNewColumn, visitedByReference } = require('./src/database/schemas/registerd_user');
const { createUsersPointsTable } = require('./src/database/schemas/usersPoints');
const { checkUserExists } = require('./src/middlewares/checkUserExists');
const { authenticate, videoContent } = require('./src/middlewares/authentication');
const authrouter = require('./src/routes/authroute');
const userActivites = require('./src/routes/userActivites')

const app = express()
app.use(express.json());

app.use('/auth', authrouter)

app.use('/api', userActivites)

// app.use('/user-activites', user)
app.get('/', (req, res) => {
    res.send("this have been setup")
})

app.get('/createTable', createRegisteredUserTable)

// app.post('/insertdata/:shortenedPath?', checkUserExists, insertUserDetails)

// app.post('/insertColumn', insertNewColumn)

// app.post('/loggedIn', createUsersPointsTable)

// app.get('/accessResource', authenticate, videoContent)
app.listen(2000, () => {
    console.log("......serverStarted.........");

})

