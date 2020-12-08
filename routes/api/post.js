const express = require('express');
const router = express.Router();

// When we want to create a route


// @route   GET api/posts
// @desc    Test route
// @access   Public
router.get('/', (req, res) => res.send('Posts route'));

module.exports = router;