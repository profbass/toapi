var express = require('express');
var router = express.Router();
const app = express();
const port = 5000;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
