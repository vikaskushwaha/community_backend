const { google } = require('googleapis')

const serveiceAccount = require('../../data-from-mycommunity-39f3fa529d3f.json')

const auth = new google.auth.GoogleAuth({
    credentials: serveiceAccount,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
})


const sheets = google.sheets({ version: "v4", auth });

module.exports = sheets;