

const getDataForGoogleSheet = require("../dal/googleSheetDataDal");
const { formatDataForGoogleSheet } = require("../../../../utils/dataFormattedForGoogleSheet");
const sheets = require("../../../../database/googleSheet_config");

const writeInGooglesheet = async () => {

    try {
        const { userData, userAcitivity } = await getDataForGoogleSheet();
        const formattedData = formatDataForGoogleSheet(userData, userAcitivity)
        

        const response = await sheets.spreadsheets.values.update({

            spreadsheetId: "1HZy2j3NOehV9z3hc8KStXR0ngGtYV_VcyvLtiHzDDlk",
            range: "sheet1!A2:F",
            valueInputOption: "RAW",
            requestBody: {
                values: formattedData,
            },
        })
        // console.log("data inserted in googleSheet", response);

    } catch (error) {
        console.log(error);

        throw new Error("error form dataSincInGoogleSheet", error)
    }

}

module.exports = { writeInGooglesheet }