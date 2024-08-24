var express = require('express');
var router = express.Router();
var usersCtrl = require('../controllers/users');
var securityMiddleware = require('../middleware/security');

/* GET users */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST signup users */ 
router.post('/signup', usersCtrl.signupUser)

/* GET signin details */
router.get('/signin', usersCtrl.getSigninDetails)

/* GET user details */
router.get('/:user_id', usersCtrl.getUser)

router.post("/signin", usersCtrl.signinUser);

router.post("/checkSignin", securityMiddleware.checkSignin, usersCtrl.checkSignin);
router.post("/checkpermission", securityMiddleware.checkPermission, usersCtrl.checkPermission);

router.post("/signout", securityMiddleware.checkPermission, usersCtrl.signoutUser);

module.exports = router;
