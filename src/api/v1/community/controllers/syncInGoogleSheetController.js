const { writeInGooglesheet } = require("../services/googleSheetServices")

const syncInGoogleSheet = async (req, res) => {


    try {
        await writeInGooglesheet();
        return res.status(200).json({
            message: "Data successfully synchronized with Google Sheets!",
        });
    } catch (error) {
        console.error("Error syncing data with Google Sheets:", error);
        return res.status(500).json({
            message: "An error occurred while syncing data with Google Sheets.",
            error: error.message,
        });
    }
}

module.exports = {
    syncInGoogleSheet
}