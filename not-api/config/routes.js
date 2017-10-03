const express         = require('express');
const router          = express.Router();
const assets          = require('../controllers/assets');

router.route('/assets/docx_template')
  .get(assets.show);

module.exports = router;
