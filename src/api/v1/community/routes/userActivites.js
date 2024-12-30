const express = require("express");
const { route } = require("./authroute");
const { authenticate } = require("../../../../middlewares/authentication");
const { welcomePage } = require("../controllers/welcome");
const videoStreakTrack = require("../controllers/videoStreak");
const videoWatchHistory = require("../controllers/totalVideoWatched");
const getUsersPoints = require("../controllers/totalUsersPoints");
const { FetchDsaPlaylist } = require("../controllers/fetchDsaPlayList");


const router = express.Router();

router.get('/welcome', authenticate, welcomePage)

router.post('/videostreak', authenticate, videoStreakTrack)

router.post('/videoWatched', authenticate, videoWatchHistory)

router.get('/getuserpoints', authenticate, getUsersPoints)

router.get('/fetchDsaPlaylist', FetchDsaPlaylist)

module.exports = router;

