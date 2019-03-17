const express = require('express');
const router = express.Router();

// 2 controllers needed
// Controller 1: User management
const REQUESTS_controller = require('../controllers/REQUESTS.controller');

//===========//
// PART B: FOR USER REQUESTS
//===========//
// 1) a simple test url to check that all of our files are communicating correctly.
router.get('/test', REQUESTS_controller.test);
// 2) user submits form (no account)
router.post('/usersubmit', REQUESTS_controller.usersubmit);
// 3) User submits form (have an account)
router.post('/usersubmitacc', REQUESTS_controller.usersubmitacc);

//===========//
// PART C: FOR ADMIN HANDLING
//===========//
// 1) Admin can take up a problem
router.post('/adminhandle', REQUESTS_controller.adminhandle);
// 2)


//===========//
// PART D: FOR SHARED APIs with conditionals
//===========//
// View their respective messages. admin see all
router.get('/view', REQUESTS_controller.viewmessage);
// Chat between admin and user
router.post('/chats',REQUESTS_controller.chats);

module.exports = router;
