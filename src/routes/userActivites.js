const express = require("express");
const { route } = require("./authroute");
const { authenticate } = require("../middlewares/authentication");
const { welcomePage } = require("../controllers/userActivites/welcome");
const videoStreakTrack = require("../controllers/userActivites/videoStreak");
const videoWatchHistory = require("../controllers/userActivites/totalVideoWatched");
const getUsersPoints = require("../controllers/userActivites/totalUsersPoints");

const router = express.Router();

router.get('/welcome', authenticate, welcomePage)

router.post('/videostreak', authenticate, videoStreakTrack)

router.post('/videoWatched', authenticate, videoWatchHistory)

router.get('/getuserpoints', authenticate, getUsersPoints)

module.exports = router;

