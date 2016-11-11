#!/bin/env node
'use strict';

const Promise = require('bluebird');
const prompt = require('prompt');
prompt.message = '';
const colors = require('colors');

const config = require('./src/config');
const db = require('./src/db');
const User = require('./src/db/user');

require('./src/log')('install');

let addAdminUser = () => {
  logInfo('Adding admin account:');

  let userPromptSchema = {
    properties: {
      username: {
        name: 'username',
        description: colors.yellow('Username'),
        message: 'Oh, come on! Empty username? What am I supposed to do with that?!',
        required: true
      },
      password: {
        name: 'password',
        description: colors.yellow('Password'),
        message: 'Empty password? Like, really? You sure, you should be an admin?',
        required: true,
        hidden: true,
        replace: '*'
      }
    }
  };

  return new Promise((resolve, reject) => {
    prompt.start();
    prompt.get(userPromptSchema, (err, answers) => {
      if(err) reject(err);

      User.findOne({ 'username': answers.username }).then((candidate) => {
        if (candidate) return reject(`Refusing to overwrite present user ${candidate.username}`);

        let admin = new User({
          username: answers.username,
          password: answers.password,
          access: {
            isAdmin: true,
            writeAPI: true,
            readAPI: true,
            manageUsers: true
          }
        });

        admin.save().then(() => {
          logSuccess(`Admin account with username '${answers.username}' has been created.`);
          resolve();
        }).catch(reject);

      });
    });
  });
};

db.connect()
.then(() => {
  logWarn('Removing test account \'bobby\'');
  User.remove({ username: 'bobby' }, () => {});
})
.then(addAdminUser)
.then(() => {
  logSuccess('All done.');
  logInfo(`Point your browser to http://${config.get('server:host')}:${config.get('server:port')}/help to get started!`);
  logInfo('... after you started the server (`npm start`), of course.');
})
.catch((err) => {
  logError('Awww, great; something went wrong here...');
  logError(err);
}).finally(() => process.exit(0));

