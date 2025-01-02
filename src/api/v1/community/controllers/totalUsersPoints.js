
const tokenDecoder = require("../../../../utils/tokenDecoder");
const { totalUserPointsServices } = require("../services/totalUserPointsServices");

async function getUsersPoints(req, res) {

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
        const totalPointsOfUser = await totalUserPointsServices(emailId)
        res.status(200)
            .json(
                {
                    success: true,
                    TotalPoints: totalPointsOfUser
                }
            );

    } catch (error) {
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