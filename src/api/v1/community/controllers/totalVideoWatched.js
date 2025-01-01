const tokenDecoder = require("../../../../utils/tokenDecoder");
const { watchedVideoHistoryServices } = require("../services/watchedVideoHistoryServices");

async function videoWatchHistory(req, res) {
    const videoId = req.body.videoId;
    const token = req.cookies.auth_token;
    const emailId = tokenDecoder(token)
    try {
        await watchedVideoHistoryServices(emailId, videoId);
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
