const db = require("../../database/db_config");

async function getUsersPoints(req, res) {
    try {
        const UserId = req.user.userId;
        const result = await db.one(`SELECT  total_points FROM userpoints WHERE id= $1`, [UserId])
        const totalPointsOfUser = result.total_points
        console.log("userid", UserId);
        res.status(200)
            .json(
                {
                    success: true,
                    message: `totalpoints ${totalPointsOfUser}`
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