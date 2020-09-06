/** Main route file
 *  All routes must pass through this file
 */

const express = require('express');

const router = express.Router();

const constant = require('../core/constant');
const authenticate = require(constant.path.base + 'middleware/authenticate');

/** Import route files */
const questions = require('./questions');
const answers = require('./answers');
const diaryEntries = require('./diaryEntries');
const auth = require('./auth');
/** Import route files ends */

/** Authentication middleware */
router.use('/', authenticate);

/**  Use routes */
router.use('/questions', questions);
router.use('/answers', answers);
router.use('/diaryEntries', diaryEntries);
router.use('/auth', auth);
/**  Use routes ends*/

/** Route to check environment status */
router.get('/ping', (req, res) => {
    res.send('pong')
})

router.use('/', (req, res) => {
    res.send("404 not avaialable");
})

module.exports = router;