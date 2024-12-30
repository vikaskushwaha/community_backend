const { watchedVideoHistoryServices } = require("../services/watchedVideoHistoryServices");

async function videoWatchHistory(req, res) {
    const videoId = req.body.videoId;
    const userId = req.user.userId;
    try {
        await watchedVideoHistoryServices(userId, videoId);
        res.status(200)
            .json(
                {
                    success: true,
                    message: "data Added"
                }
            );

    } catch (error) {
        res.status(500).json(
            {
                status: false,
                message: error.message
            }
        )
    }
}

module.exports = videoWatchHistory;
