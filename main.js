require('dotenv').config();
require('./src/database/db_config')
const express = require('express')
const { createRegisteredUserTable, insertUserDetails, insertNewColumn, visitedByReference } = require('./src/database/schemas/registerd_user');
const { createUsersPointsTable } = require('./src/database/schemas/usersPoints');
const { checkUserExists } = require('./src/middlewares/checkUserExists');
const { authenticate, videoContent } = require('./src/middlewares/authentication');
const authrouter = require('./src/routes/authroute');
const userActivites = require('./src/routes/userActivites')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const cors = require('cors')
const app = express()
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

const corsOptions = {
    origin: "http://localhost:3000", // URL of the Next.js frontend
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};

app.use(cors(corsOptions))


app.use('/auth', authrouter)

app.use('/api', userActivites)

// app.use('/user-activites', user)
app.get('/', (req, res) => {
    res.send("this have been setup")
})
app.post('/createTable', createRegisteredUserTable)
app.post('/createUsersActivityTable', createUsersPointsTable)

// app.post('/insertdata/:shortenedPath?', checkUserExists, insertUserDetails)

// app.post('/insertColumn', insertNewColumn)

// app.post('/loggedIn', createUsersPointsTable)

// app.get('/accessResource', authenticate, videoContent)

app.listen(process.env.PORT, () => {
    console.log("......serverStarted.........");

})

