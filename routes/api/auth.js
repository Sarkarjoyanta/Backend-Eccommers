const express = require('express');
const router = express.Router()
const registrationController = require('../../controllers/registrationController.js');
const loginController = require('../../controllers/loginControllers.js');
const otpControllers = require('../../controllers/otpControllers.js');

router.post('/registration', registrationController)
router.post('/login', loginController)
router.post('/otpmatch', otpControllers)

module.exports = router;