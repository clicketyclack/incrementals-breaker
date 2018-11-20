var gulp = require('gulp');
var ts = require('gulp-typescript');
var merge = require('merge2');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var rjs = require('gulp-requirejs');
var sourcemaps = require('gulp-sourcemaps');


// ------------------------------------------------- configs
var paths = {
  common: {
    base_path: './dist/'
  },
  sass: {
    src: './src/sass/**/*.{scss,sass}',
    dest: './dist/css/',
    opts: {

    }
  },
  ts: {
    src: './src/ts/**/*.ts',
    dest: './dist/js/',
    opts: {

    }
  },
  static: {
    src: './src/static'
  }
};


// -------------------------------  Build targets
gulp.task('copy-static', function(done) {
  gulp.src(paths.static.src + '/**/*', {base: paths.static.src})
    //.pipe(gulp.watch(paths.static.src, {base: paths.static.src}))
    .pipe(gulp.dest(paths.common.base_path));
    // .pipe(gulp.reload({ stream:true }));
    done();
});

var ts = require('gulp-typescript');

var tsProject = ts.createProject('tsconfig.json',
    { typescript: require('typescript') });

gulp.task('ts-compile', function () {
    var tsResult = tsProject.src()
        .pipe(tsProject());
    return tsResult.pipe(gulp.dest(paths.ts.dest));
});

gulp.task('rjs', function(cb){
  rjs_config = {
    baseUrl: './dist',
    name: 'main',
    out: '../build/main-built.js'
  };

  return rjs(rjs_config)
  //.pipe(sourcemaps.init({loadMaps: true})) // initialize gulp-sourcemaps with the existing map
  //.pipe(sourcemaps.write()) // write the source maps
  .pipe(gulp.dest('./dist/')); // pipe it to the output DIR

});

// Build sass.
gulp.task('sass', function () {
  return gulp.src(paths.sass.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.sass.dest))
});

// Watcher: Without browserSync reload.
gulp.task('watch', function () {
  gulp.watch(paths.sass.src, gulp.series('sass'));
  gulp.watch(paths.ts.src, gulp.series('ts-compile'));
  gulp.watch(paths.static.src, gulp.series('copy-static'));
});

// Watcher: With browserSync reload.
gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: paths.common.base_path
    }
  });

  gulp.watch(paths.sass.src, gulp.series('sass')).on('change', browserSync.reload);
  gulp.watch(paths.ts.src, gulp.series('ts-compile')).on('change', browserSync.reload);
  gulp.watch(paths.static.src, gulp.series('copy-static')).on('change', browserSync.reload);
});


gulp.task('default', gulp.parallel('sass', 'ts-compile', 'copy-static'));
