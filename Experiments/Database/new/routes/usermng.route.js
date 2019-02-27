let express = require('express');
let router = express.Router();

const user_controller = require("../controllers/usrmng.controller");

router.get('/test', user_controller.test); // constant declared earlier
router.post('/signup', user_controller.user_create);
router.get('/login/:username', user_controller.user_verify);
router.delete('/delete/:username', user_controller.user_delete);

module.exports = router
