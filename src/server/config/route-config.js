(function (routeConfig) {

  'use strict';

  routeConfig.init = function (app) {

    // *** routes *** //
    const routes = require('../routes/index');
    //route for users.js
    const userRoute = require('../routes/users');
    //route for restaurants.js
    const restaurantRoute = require('../routes/restaurants');
    //route for reviews.js
    const reviewRoute = require('../routes/reviews');

    // *** register routes *** //
    app.use('/', routes);
    app.use('/users', userRoute);
    app.use('/restaurants', restaurantRoute);
    app.use('/restaurants/:restID/reviews', reviewRoute);

  };

})(module.exports);
