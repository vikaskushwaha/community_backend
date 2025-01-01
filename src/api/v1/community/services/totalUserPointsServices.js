const { totaluserPointsData } = require("../dal/totalUsersPointsDal")

const totalUserPointsServices = async (emailId) => {
    try {


        const result = await totaluserPointsData(emailId)
        const totalPointsOfUser = result.total_points
        return totalPointsOfUser;
    } catch (error) {
        throw error
    }
}

module.exports = {
    totalUserPointsServices
}