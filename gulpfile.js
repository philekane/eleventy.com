const { watch, src, dest, series, parallel } = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

function cssTask() {
 // return src('./assets/sass/style.sass')
  return src('./assets/sass/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' })).on('error', sass.logError)
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./assets/css'))
}

function watchFiles() {
 // watch('./assets/**/*.sass', parallel(cssTask));
  watch('./assets/**/*.scss', parallel(cssTask));
};

exports.default = parallel(cssTask, watchFiles);