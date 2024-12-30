const { welcomePageData } = require("../dal/welcomePageDl");


const welcomePageServices = async (userId) => {
    try {
        const { userData, userPoints } = await welcomePageData(userId);
        let totalpercent;
        if (userPoints.watched_video == null) {
            totalpercent = 0;

        }
        else {
            totalpercent = Math.floor((userPoints.watched_video.length * 100) / 112);
        }
        return { userData, userPoints, totalpercent }
    } catch (error) {
        throw error
    }
}

module.exports = {
    welcomePageServices
}