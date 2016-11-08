'use strict';

const apiController = {};

apiController.home = (req, res, next) => {
  res.json({ message: 'Welcome to the ETdb API v1' });
};

apiController.protected = (req, res, next) => {
  res.json({ message: 'Well, we have a worthy one! '});
};

module.exports = apiController;
