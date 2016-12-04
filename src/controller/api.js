'use strict';

const mw = require('../middleware');
const App = require('../db/app');

const apiController = {};

apiController.addApp = (req, res, next) => {
  mw.canAccess(req, res, () => {
    let data = req.body;
    let tokenData = req.tokenPayload;
    let app = new App({
      name: data.name,
      publisher: data.publisher,
      store_url: data.store_url
    });
    app.save().then(() => {
      let msg = `${data.name} has been createad`;
      logSuccess(msg + ' by ' + tokenData.username);
      res.status(201).json({ message: msg });
    }).catch(() => res.status(409).json({
      message: `(${data.name}) already exists`
    }));
  }, 'writeAPI');
};

module.exports = apiController;
