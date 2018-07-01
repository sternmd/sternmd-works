const gulp = require('gulp'),
      babel = require('gulp-babel'),
      path = require('path'),
      sass = require('gulp-sass'),
      sourcemaps = require('gulp-sourcemaps'),
      browserSync = require('browser-sync'),
      autoprefixer = require('gulp-autoprefixer'),
      uglify = require('gulp-uglify'),
      jshint = require('gulp-jshint'),
      cache = require('gulp-cached'),
      concat = require('gulp-concat'),
      rename = require('gulp-rename'),
      cssnano = require('gulp-cssnano'),
      imagemin = require('gulp-imagemin'),
      stylish = require('jshint-stylish'),
      notify = require('gulp-notify'),
      plumber = require('gulp-plumber');


const config = {
  browserSync: {
    files: [,
      "dist/assets/img/**/*",
      "dist/assets/css/**/*",
      "app/assets/js/**/*"
    ],
    server: {
      baseDir: "dist",
      index: "index.html"
    },
    reloadOnRestart: true
  }
};

var onError = (err) => {
  notify.onError({
    title: "Gulp - Project Title",
    subtitle: "Failure!",
    message: "Error: <%= error.message %>",
    sound: "Beep"
  })(err);
  this.emit('end');
};

gulp.task('css', () => {
  return gulp.src('src/scss/main.scss')
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 4 version'))
    .pipe(cssnano())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('js', () => {
  gulp.src('src/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(cache('linting'))
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.reload({
      stream: true,
      once: true
    }));
});

gulp.task('images', () => {
  gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
});

gulp.task('html', () => {
  gulp.src('src/*.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: "dist",
      index: "index.html"
    }
  });
});

gulp.task('build', ['html', 'css', 'js'], () => {
  return true;
});

gulp.task('default', ['build', 'browser-sync'], () => {
  gulp.watch('src/scss/**/*.scss', ['css']);
  gulp.watch('src/js/**/*.js', ['js']);
  gulp.watch('src/images/*', ['images']);
  gulp.watch('src/*.html', ['html']);
  gulp.watch('src/*.html').on('change', browserSync.reload);
});
