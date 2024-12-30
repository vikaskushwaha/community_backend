const express = require('express');
const { createRegisteredUserTable } = require('../../../../database/schemas/registerd_user');
const { createUsersPointsTable } = require('../../../../database/schemas/usersPoints');

const router = express.Router();

router.post('/createTable', createRegisteredUserTable)
router.post('/createUsersActivityTable', createUsersPointsTable)



module.exports = router;