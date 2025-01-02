const tokenDecoder = require("../../../../utils/tokenDecoder");
const { watchedVideoHistoryServices } = require("../services/watchedVideoHistoryServices");

async function videoWatchHistory(req, res) {

    try {
        const videoId = req.body.videoId;
        const token = req.cookies.auth_token;
        if (!token) {
            res.status(401).json({
                success: false,
                message: "Auth token not found on Welcome Page"

            })
        }
        const emailId = tokenDecoder(token)
        if (!emailId) {
            res.status(404).json({
                success: false,
                message: "EmailId not found on welcome Page"

            })
        }
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
