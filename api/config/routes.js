const express         = require('express');
const router          = express.Router();
const assets          = require('../controllers/assets');

router.route('/assets/MOU_input')
  .get(assets.show);

module.exports = router;
