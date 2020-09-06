const express = require('express');
const router = express.Router();

const auth = require('../controllers/auth');
const asyncHandler = require('../middleware/asyncHandler');

router.post('/login', asyncHandler(auth.login));

module.exports = router;