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
// 2) Admin can change the status to complete (To remove this and integrate control logic in the above one)
router.post('/admincomplete', REQUESTS_controller.admincomplete);
// 3) Admins should be able to see their own messages
router.get('/adminview', REQUESTS_controller.adminview);


//===========//
// PART D: FOR SHARED APIs with conditionals
//===========//
// View their respective messages. admin see all (Should be sorted by date?)
router.get('/view', REQUESTS_controller.viewmessage);
// Chat between admin and user
router.post('/chats',REQUESTS_controller.chats);
// Sort by date
router.get('/viewdate', REQUESTS_controller.viewdate);
// Sort by status and date
router.get('/viewstatus', REQUESTS_controller.viewstatus);
// Sort by who and Date (1 individual could have multiple requests)
router.get('/viewwho', REQUESTS_controller.viewwho);
// Sort by category and Date
router.get('/viewcategory', REQUESTS_controller.viewcategory);
// Sort by sentiment
router.get('/viewpriority', REQUESTS_controller.viewpriority);
module.exports = router;


// APIs to Test
/*

*/
