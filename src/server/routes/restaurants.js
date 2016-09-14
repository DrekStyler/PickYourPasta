const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('restaurants/');
});

router.get('/new', (req, res, next) => {
  res.render('restaurants/new');
});

router.get('/edit', (req, res, next) => {
  res.render('restaurants/restaurant-edit');
});

module.exports = router;
