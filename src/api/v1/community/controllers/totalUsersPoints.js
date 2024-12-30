
const { totalUserPointsServices } = require("../services/totalUserPointsServices");

async function getUsersPoints(req, res) {
    try {
        const userId = req.user.userId;
        const totalPointsOfUser = await totalUserPointsServices(userId)
        res.status(200)
            .json(
                {
                    success: true,
                    TotalPoints: totalPointsOfUser
                }
            );

    }
    catch (error) {
        res.status(500)
            .json(
                {
                    success: false,
                    message: error.message
                }
            );
    }
}

module.exports = getUsersPoints;