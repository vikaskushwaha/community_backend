
const formatDataForGoogleSheet = (userData, usersAcitivity) => {
    try {

        const formattedData = userData.map(user => {
            const userAcitvity = usersAcitivity.find(activity => activity.id === user.id);
            return [
                user.phone,
                user.name,
                userAcitvity && userAcitvity.curr_date_of_video_watch
                    ? userAcitvity.curr_date_of_video_watch.toISOString().split('T')[0]
                    : 0,

                userAcitvity.total_points,
                user.shortenedurl,
                userAcitvity ? userAcitvity.last_video_title : 0,

            ]

        })


        return formattedData
    } catch (error) {
        throw new Error(error)


    }


}

module.exports = {
    formatDataForGoogleSheet
}