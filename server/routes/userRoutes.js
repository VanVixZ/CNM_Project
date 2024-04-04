
const { register, login , setAvartar } = require('../controllers/usersController'); 

const router = require('express').Router();

router.post("/register", register);
router.post("/login", login);
router.post("/setAvartar/:id", setAvartar); 

module.exports = router;
