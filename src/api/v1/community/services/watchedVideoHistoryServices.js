const { getCurrentPointsOfUser, checkVideoIsAlreadyWatched, updateVideoList } = require("../dal/watchedVideoHistoryDal")


const watchedVideoHistoryServices = async (emailId, videoId) => {
    try {
        let totalPoints = await getCurrentPointsOfUser(emailId)
        const result = await checkVideoIsAlreadyWatched(emailId, videoId)
        if (!result) {
            totalPoints += 10;
            await updateVideoList(emailId, videoId, totalPoints)
        }

    } catch (error) {
        throw error
    }
}

module.exports = {
    watchedVideoHistoryServices
}
