const express = require("express");
const { route } = require("./authroute");
const { welcomePage } = require("../controllers/welcome");
const videoStreakTrack = require("../controllers/videoStreak");
const videoWatchHistory = require("../controllers/totalVideoWatched");
const getUsersPoints = require("../controllers/totalUsersPoints");
const { FetchDsaPlaylist } = require("../controllers/fetchDsaPlayList");
const { validateRequest } = require("../../../../middlewares/expressValidator");
const { authorizationValidator } = require("../../../../middlewares/validation");


const router = express.Router();

router.get('/welcome', validateRequest(authorizationValidator), welcomePage)

router.post('/videostreak', validateRequest(authorizationValidator), videoStreakTrack)

router.post('/videoWatched', validateRequest(authorizationValidator), videoWatchHistory)

router.get('/getuserpoints', validateRequest(authorizationValidator), getUsersPoints)

router.get('/fetchDsaPlaylist', FetchDsaPlaylist)

module.exports = router;

