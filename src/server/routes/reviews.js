const express = require('express');
const router = express.Router({mergeParams: true});

router.get('/new', (req, res, next) => {
  res.render('restaurants/reviews/add-review');
});

router.get('/edit', (req, res, next) => {
  res.render('restaurants/reviews/edit-review');
});

module.exports = router;
