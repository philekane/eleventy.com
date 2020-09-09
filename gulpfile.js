const { watch, src, dest, series, parallel } = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

const imageminMozjpeg = require('imagemin-mozjpeg');

const imagemin = require('gulp-imagemin');
const imageminGuetzli = require('imagemin-guetzli');
const webp = require('gulp-webp');

function cssTask() {
 // return src('./assets/sass/style.sass')
  return src('./assets/sass/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' })).on('error', sass.logError)
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./assets/css'))
}
/*
function resetCssTask() {
   return src('./assets/sass/_reset.css')
     .pipe(sourcemaps.init())
     .pipe(sass({ outputStyle: 'compressed' })).on('error', sass.logError)
     .pipe(postcss([autoprefixer(), cssnano()]))
     .pipe(sourcemaps.write('.'))
     .pipe(dest('./assets/css'))
 }
 */
/* use lossless - lossless: true */
/*
function creatWebp() {
  return src('./assets/img/flowers/*.jpg')
    .pipe(webp(
        quality: 80,
        preset: 'photo',
        method: 6
    ))
    .pipe(dest('_site/assets/img/flowers'))
  }
*/

function mozJpeg() {
  return src('./assets/img/flowers/*.jpg')
    .pipe(imagemin([
      imageminMozjpeg({
            quality: 85,
            progressive: true
        })
    ]))
    .pipe(dest('_site/assets/img/flowers'))
  }
/*
function guetzli() {
  return src('./assets/img/flowers/*.jpg')
    .pipe(imagemin([
        imageminGuetzli({
            quality: 85
        })
    ]))
    .pipe(dest('_site/assets/img/flowers'))
  }
*/

function watchFiles() {
 // watch('./assets/**/*.sass', parallel(cssTask));
  watch('./assets/**/*.scss', parallel(cssTask));
  
};

exports.default = parallel(cssTask,  watchFiles);