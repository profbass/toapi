var express = require('express');
var router = express.Router();
const app = express();
const port = 5000;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Use the router in your application
app.use('/', router);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

module.exports = app;