const express = require('express');
const router = express.Router();

// 2 controllers needed
// Controller 1: User management
const REQUESTS_controller = require('../controllers/REQUESTS.controller');


router.post('/profile-img-upload', REQUESTS_controller.imageupload);
//===========//
// PART B: FOR USER REQUESTS
//===========//
// 1) a simple test url to check that all of our files are communicating correctly.
router.get('/test', REQUESTS_controller.test);
// 2) user submits form (no account)
router.post('/usersubmit', REQUESTS_controller.usersubmit);
// 3) User submits form (have an account)
router.post('/usersubmitacc', REQUESTS_controller.usersubmitacc);
// 4) Post recommendations by searching the category and then tags of old request
router.post('/recommended', REQUESTS_controller.recommended);

//===========//
// PART C-1: FOR ADMIN HANDLING
//===========//
// 1) Admin can take up a problem
router.post('/adminhandle', REQUESTS_controller.adminhandle);
// 2) Admin can change the status to complete (To remove this and integrate control logic in the above one)
router.post('/admincomplete', REQUESTS_controller.admincomplete);
// 3) Admins should be able to see their own messages (Everything)
router.get('/adminview', REQUESTS_controller.adminview);
// 4) Admins view the messages that they have taken but sorted by completed
router.get('/adminviewstatus', REQUESTS_controller.adminviewstatus);
// 5) Admins view only the uncompleted messages (Specific to admin ) YOUR UNSOLVED TICKETS
router.get('/adminview/uncompleteonly', REQUESTS_controller.adminviewuncompleteonly);
// 6) Admins view their past completed messages (Specific to admin) YOUR SOLVED TICKETS
router.get('/adminview/completeonly', REQUESTS_controller.adminviewcompleteonly);
// 7) Admins archive a problem
router.post('/adminarchive', REQUESTS_controller.adminarchive);

//===========//
// PART C-2: FOR ADMIN HANDLING
//===========//
// 1) Admin see all his team's tickets
router.get('/team/viewall', REQUESTS_controller.teamviewall);
// 2) Admin sees his team's unassigned tickets
router.get('/team/unassigned', REQUESTS_controller.teamunassigned);
// 3) Admin sees his team's unsolved tickets
router.get('/team/uncomplete', REQUESTS_controller.teamuncomplete);
// 4) Admin sees his team's solved tickets
router.get('/team/complete', REQUESTS_controller.teamcomplete);

//===========//
// PART D1: FOR SHARED APIs with conditionals
//===========//
// View their respective messages. admin see all (Should be sorted by date?)
router.get('/view', REQUESTS_controller.viewmessage);
// Chat between admin and user
router.post('/chats',REQUESTS_controller.chats);
// Sort by date
router.get('/viewdate', REQUESTS_controller.viewdate);
// Sort by status and date
//router.get('/viewstatus', REQUESTS_controller.viewstatus);
router.post('/viewstatus', REQUESTS_controller.viewstatus);
// Sort by who and Date (1 individual could have multiple requests)
//router.get('/viewwho', REQUESTS_controller.viewwho);
router.post('/viewwho', REQUESTS_controller.viewwho);
// Sort by category and Date
//router.get('/viewcategory', REQUESTS_controller.viewcategory);
router.post('/viewcategory', REQUESTS_controller.viewcategory);
// Sort by sentiment
// router.get('/viewpriority', REQUESTS_controller.viewpriority);
router.post('/viewpriority', REQUESTS_controller.viewpriority);
// View specific RequestsSchema
router.get('/viewreq', REQUESTS_controller.viewreq);
// 7) Admin sees ACNAPI unassigned tickets || user sees all unassigned only
router.get('/viewallunassigned', REQUESTS_controller.viewallunassigned);
// 8) Admin sees Admin sees ACNAPI uncomplete tickets || user sees all uncompleted only
router.get('/viewalluncomplete', REQUESTS_controller.viewalluncomplete);
// 9) Admin sees Admin sees ACNAPI completed tickets || user sees all uncompleted only
router.get('/viewallcomplete', REQUESTS_controller.viewallcomplete);

//===========//
// PART D2: FOR COUNTING VARIOUS TICKET TYPES
//===========//
// 1) Count the total unassigned unsolvedTickets (no one handling)
router.get('/count/unassigned', REQUESTS_controller.countunassigned);
// 2) Count the total unsolved unsolvedTickets(Admin handle)
router.get('/count/uncomplete', REQUESTS_controller.countuncomplete);
// 3) Count All completed
router.get('/count/complete', REQUESTS_controller.countcomplete);
// 4) Count the Team's unassigned tickets
router.get('/count/team/all', REQUESTS_controller.countteamall);
// 5) Count the team's uncompleted tickets
router.get('/count/team/uncomplete', REQUESTS_controller.countteamuncomplete);
// 6) Count the Team's completed tasks
router.get('/count/team/complete', REQUESTS_controller.countteamcomplete);
// 7) Count the team's unaddress tasks
router.get('/count/team/unassigned', REQUESTS_controller.countteamunassigned);
// 8) Total count of all the messages
router.get('/count/all', REQUESTS_controller.countall);
// 9) Admins's uncompleted
router.get('/count/admin/uncomplete', REQUESTS_controller.countadminuncomplete);
// 10) Admin's completed
router.get('/count/admin/complete', REQUESTS_controller.countadmincomplete);
module.exports = router;

// Dialog Flow chat bot
//router.post('/bot', REQUESTS_controller.bot);
