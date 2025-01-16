const db = require("../../../../database/db_config");

const getDataForGoogleSheet = async () => {
    try {
        const queryFormUsers =
            `SELECT 
                id,
                name,
                phone,
                shortenedurl
            FROM users
            `;
        const userData = await db.many(queryFormUsers)


        const queryFromActivity =
            `SELECT
            id,
            curr_date_of_video_watch,
            last_video_title,
            total_points
        FROM userpoints
        `;
        const userAcitivity = await db.many(queryFromActivity)
        console.log(userAcitivity);

        return { userData, userAcitivity };
    } catch (error) {
        throw new Error("error from googlesheetDal", error);

    }

}

module.exports = getDataForGoogleSheet;