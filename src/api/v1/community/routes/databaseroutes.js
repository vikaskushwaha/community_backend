const express = require('express');
const { createRegisteredUserTable } = require('../../../../database/schemas/registerd_user');
const { createUsersPointsTable } = require('../../../../database/schemas/usersPoints');
const dsaPlaylistTable = require('../../../../database/schemas/dsaplaylistTable');

const router = express.Router();

router.post('/createTable', createRegisteredUserTable)
router.post('/createUsersActivityTable', createUsersPointsTable)
router.post('/createDsaPlaylist', dsaPlaylistTable)



module.exports = router;