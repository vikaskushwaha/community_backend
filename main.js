require('./src/database/db_config')
const express = require('express')
const { createRegisteredUserTable, insertUserDetails, insertNewColumn, visitedByReference } = require('./src/database/schemas/registerd_user');
const { createUsersPointsTable } = require('./src/database/schemas/usersPoints');
const { checkUserExists } = require('./src/middlewares/registration');
const { authenticate, videoContent } = require('./src/middlewares/authentication');
const app = express()
app.use(express.json());


app.get('/', (req, res) => {
    res.send("this have been setup")
})

app.get('/createTable', createRegisteredUserTable)

app.post('/insertdata/:shortenedPath?', checkUserExists, insertUserDetails)

// app.post('/insertColumn', insertNewColumn)

// app.post('/loggedIn', createUsersPointsTable)

app.get('/accessResource', authenticate, videoContent)
app.listen(2000, () => {
    console.log("......serverStarted.........");

})

