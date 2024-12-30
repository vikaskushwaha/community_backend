const db = require("../../../../database/db_config");





async function FetchDsaPlaylist(req, res) {
    try {
        const dsaPlaylist = await db.many('select *from dsaplaylist')
        res.status(200).json({
            success: true,
            data: dsaPlaylist,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: 'Failed to fetch playlist. Please try again later.',
            error: error.message, // Include error details (optional, for debugging)
        });
    }


}

module.exports = { FetchDsaPlaylist }