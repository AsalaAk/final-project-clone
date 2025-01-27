const express = require('express');
const router = express.Router();
const usersController = require('../controllers/user-controller');
const rateLimit = require('express-rate-limit');
const authenticateUser = require('../middleware/authenticateUser'); // Import middleware


router.post('/register', usersController.registerNewUser);
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 login attempts per windowMs
    message: "Too many login attempts, please try again after 15 minutes.",
});

router.post('/login', usersController.loginUser);
router.get('/persons', usersController.getAllUsers);
router.get('/ezors', usersController.getUniqueEzors);
router.get('/person/:id', usersController.getPersonById);
router.get('/profile/:id', authenticateUser, usersController.getUserProfile);
router.put('/update', authenticateUser, usersController.updateUserProfile);


module.exports = router;