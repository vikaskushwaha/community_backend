

const { videoStreakTrackServices } = require("../services/videoStreakServices");

async function videoStreakTrack(req, res) {
    try {
        const userId = req.user.userId;
        await videoStreakTrackServices(userId);

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