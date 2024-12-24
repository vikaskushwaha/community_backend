require('dotenv').config();
require('./src/database/db_config')
const express = require('express')
// const authrouter = require('./src/api/v1/userbase/routes/authroute');
// const userActivites = require('./src/api/v1/userbase/routes/userActivites')
// const dbRoutes = require('./src/api/v1/userbase/routes/databaseroutes')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const db = require('./src/database/db_config');
const v1Router = require('./src/api/v1/routes/v1_routr');
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

// app.use('/auth', authrouter)

// app.use('/api', userActivites)

// app.use('database', dbRoutes)

app.use('/v1', v1Router)

// app.use('/user-activites', user)
app.get('/', (req, res) => {
    res.send("this have been setup")
})


app.listen(process.env.PORT, () => {
    console.log("......serverStarted.........");

})

