const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const config = require('config')

const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// When we want to create a route


// @route   GET api/users
// @desc    Register user
// @access   Public
router.post('/', [
  check('name', 'Name is required').trim().not().isEmpty(),
  check('email', 'Please enter valid email').isEmail(),
  check('password', 'Please enter a password with 3 or more characters').isLength({ min: 3 })
],
  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // See if user exists if so send error
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ errors: [{ msg: 'User already exists' }] })
      }

      // Get user gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      })
      user = new User({
        name, email, avatar, password
      })

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Save user
      await user.save();

      const payload = {
        user: {
          id: user.id
        },
        test: {
          id: "tesdId"
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token })
        }
      )

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });

module.exports = router;