'use strict';

const gulp = require('gulp');
const gutil = require('gulp-util');
const clean = require('gulp-clean');
const apidoc = require('gulp-apidoc');
const exec = require('child_process').exec;

const srcRoot = '../src/';

gulp.task('apidoc', [ 'clean' ], (done) => {
  apidoc({
    src: '../src/',
    dest: './output/api-server/ap',
    includeFilters: [ '.*\\.js$' ],
    config: '../',
    silent: true
  }, done);
});

gulp.task('jsdoc', [ 'clean' ], (done) => {
  var pname = require('../package.json').name;

  let params = {
    configure: '../.jsdoc',
    package: '../package.json',
    readme: '../README.md',
    destination: './output/', // overwrites setting in .jsdoc
    recurse: ''
  };

  let paramString = Object.keys(params).reduce((acc, key) => {
    acc.push(`--${key} ${params[key]} `);
    return acc;
  }, []).join(' ');

  exec(`jsdoc ${paramString}${srcRoot}`, (err, stdOut, stdErr) => {
    if (err) {
      gutil.log(pname, gutil.colors.red('JSDoc generation failed...'));
      gutil.log(pname, gutil.colors.yellow(err));
      return;
    }
    gutil.log(pname, gutil.colors.green('JSDocs created. '));
    done();
  });
});

gulp.task('clean', (done) => {
  return gulp.src('output/', { read: false }).pipe(clean());
});

gulp.task('default', [ 'clean', 'jsdoc', 'apidoc' ], (done) => done());
