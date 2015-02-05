var gulp = require('gulp');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var shell = require('gulp-shell');
var bs = require('browser-sync');
var nodemon = require('gulp-nodemon');

var paths = {
  scripts: ['public/**/*.js'],
  styles: ['public/**/*.css']
};

gulp.task('serve', function () {
  nodemon({script: 'index.js', ignore: 'node_modules/**/*.js'});
});

gulp.task('start', ['serve'], function () {
  bs({
    notify: true,
    injectChanges: true,
    files: paths.scripts.concat(paths.styles),
    proxy: 'localhost:8000'
  });
});

gulp.task('sass', function () {
  gulp.src('./scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./client/css'));
});

gulp.task('sass-watch', ['sass'], function () {
  watch('./scss/*.scss', function () {
    gulp.start('sass');
  });
});

gulp.task('jsx', shell.task([
  'jsx --no-cache-dir public/jsx/ public/javascripts/react/'
]));

gulp.task('jsx-watch', ['jsx'], function () {
  watch('./public/jsx/**/*.js', function () {
    gulp.start('jsx');
  });
});

gulp.task('browserify', shell.task([
  'browserify public/jsx/Router.js -o public/javascripts/bundle.js'
]));

gulp.task('watchify', shell.task([
  'watchify -d public/jsx/Router.js -o public/javascripts/bundle.js -v'
]));
