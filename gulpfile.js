const { watch, src, dest, series, parallel } = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

function cssTask() {
  return src('./assets/sass/*.sass')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' })).on('error', sass.logError)
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./_sites/assets/css'))
}

function watchFiles() {
  watch('./assets/**/*.sass', parallel(cssTask));
};

exports.default = parallel(cssTask, watchFiles);