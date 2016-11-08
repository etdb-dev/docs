'use strict';

const apiController = {
  home: (req, res, next) => {
    res.json({ message: 'Welcome to the ETdb API v1' });
  },
  protected: (req, res, next) => {
    res.json({ message: 'Well, we have a worthy one! '});
  }
};

module.exports = apiController;
