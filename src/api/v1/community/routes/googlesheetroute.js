const express = require('express');

const { syncInGoogleSheet } = require("../controllers/syncInGoogleSheetController");


const router = express.Router();

router.post('/writeSheet', syncInGoogleSheet)

module.exports = router