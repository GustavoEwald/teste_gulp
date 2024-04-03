const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'))
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const obfuscate = require('gulp-obfuscate');
const imagemin = require('gulp-imagemin');

function comprime_imagens(){
  return gulp.src('./src/images/*')
  .pipe(imagemin([
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5})
  ]))
  .pipe(gulp.dest('./dist/images'))
}

function comprime_js(){
  return gulp.src('./source/scripts/*.js')
        .pipe(uglify())
        .pipe(obfuscate())
        .pipe(gulp.dest('./build/scripts'));
}

function compila_sass(){
  return gulp.src('./source/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
              outputStyle: 'compressed'
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/styles/'));
}

exports.sass = compila_sass;
exports.watch = function(){
  gulp.watch('./source/styles/*.scss', {ignoreInitial: false}, gulp.series(compila_sass))
};
exports.javascript = comprime_js;
exports.images = comprime_imagens;