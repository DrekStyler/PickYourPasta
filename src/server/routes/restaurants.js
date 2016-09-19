const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/', (req, res, next) => {
  let getRest = knex('restaurants').select().orderBy('id','desc');
  let findAve = knex.raw('select restaurants.id , avg(reviews.rating) from restaurants , reviews where restaurants.id = reviews.rest_id group by restaurants.id;');
  Promise.all([
    findAve,
    getRest
  ])
  .then((results) => {
    const renderObject = {};
    renderObject.restaurants = results[1];
    renderObject.averages = results[0].rows;
    res.render('restaurants/restaurants',renderObject);
  });
});

router.get('/:id', (req,res,next) => {
  const id = parseInt(req.params.id);
  let findRestaurant = knex('restaurants').where('restaurants.id', id).first();
  let findReviews = knex('reviews').where('reviews.rest_id', id);
  let findUsers = knex('reviews').where('reviews.rest_id', id).join('users', 'users.id', 'reviews.user_id').select('users.id', 'users.first_name', 'users.last_name');
  let getEmployees = knex('employees').where('employees.rest_id',id);
  Promise.all([
    findRestaurant,
    findReviews,
    findUsers,
    getEmployees
  ])
  .then((results) => {

    const renderObject = {};
    let restRating = 0;
    renderObject.restaurants = results[0];
    renderObject.reviews = results[1];
    renderObject.users = results[2];
    renderObject.employees = results[3];
      let indRatings = results[1];
      let avgRate = 0;
      let finAve = 0;
      indRatings.forEach((rate) => {
        avgRate += indRatings.rating;
      });
       finAve = parseFloat(avgRate / indRatings.length);
    renderObject.avg = finAve;
    res.render('restaurants/restaurant', renderObject);
  });
});

router.get('/new', (req, res, next) => {
  res.render('restaurants/new');
});

router.get('/edit', (req, res, next) => {
  res.render('restaurants/restaurant-edit');
});

router.delete('/delete/:id', (req,res,next) => {
  console.log('here');
  const id = parseInt(req.params.id);
  knex('restaurants')
  .del()
  .where('id',id)
  .returning('*')
  .then((results) => {
    if (results.length) {
      res.status(200).json({
        status:'success',
        message: `${results[0].name} is gone!`
      });
    } else {
      res.status(404).json({
        status: 'error',
        message: 'this Id does not exist'
      });
    }
  })
  .catch((err) => {
    res.status(500).json({
      status: 'errror',
      message: 'Something bad happened!'
    });
  });
});

module.exports = router;
