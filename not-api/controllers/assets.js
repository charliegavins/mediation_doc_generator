const fs            = require('fs');
const path          = require('path');

function assetsShow(req, res){
  let content = fs
  .readFileSync(path.resolve(__dirname, '../lib/docx_template.docx'), 'binary');
  if (!content) return res.status(500).json({ message: 'Something went wrong.' });
  return res.status(200).json(content);
}

module.exports = {
  show: assetsShow
};
