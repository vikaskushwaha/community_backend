
const tokenDecoder = require("../../../../utils/tokenDecoder");
const { totalUserPointsServices } = require("../services/totalUserPointsServices");

async function getUsersPoints(req, res) {


    try {
        const token = req.cookies.auth_token;
        const emailId = tokenDecoder(token)
        const totalPointsOfUser = await totalUserPointsServices(emailId)
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