const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth/AuthController');
const PasswordController = require('../controllers/auth/PasswordController');
const RegisterController = require('../controllers/auth/RegisterController');
const VerifyController = require('../controllers/auth/VerifyController');

// Authentication Routes...
router.get('/login', AuthController.showLoginForm);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);

// Registration Routes...
router.get('/register', RegisterController.showRegisterForm);
router.post('/register', RegisterController.register);

// Password Reset Routes...
router.get('/password/reset', PasswordController.showLinkRequestForm);
router.post('/password/email', PasswordController.sendResetLinkEmail);
router.get('/password/reset/:token', PasswordController.showResetForm);
router.post('/password/reset', PasswordController.update);

// Email Verification Routes...
router.get('/email/verify', VerifyController.showNoticeSendEmail);
router.get('/email/verify/:token', VerifyController.showVerifyForm);
router.post('/email/resend', VerifyController.resendVerifyEmail)

module.exports = router;