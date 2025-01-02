

const tokenDecoder = require("../../../../utils/tokenDecoder");
const { videoStreakTrackServices } = require("../services/videoStreakServices");

async function videoStreakTrack(req, res) {
    try {

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
        await videoStreakTrackServices(emailId);

        res.status(200)
            .json(
                {
                    success: true,
                    message: "data found"
                }
            );
    }
    catch (error) {
        console.error("Error in videoStreakTrack:", error.message);

        res.status(500).json({
            success: false,
            message: "An error occurred while processing your request.",
        });
    }

}

module.exports = videoStreakTrack;