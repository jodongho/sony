const gulp = require('gulp');
const hb = require('gulp-hb');

function compileHandlebars() {
  return gulp
    .src('./src/html/**/*.html')
    .pipe(
      hb({ debug: true, bustCache: true })
        .partials('./src/hbs/layouts/*.{js,hbs}')
        .partials('./src/hbs/partials/*.{js,hbs}')
        .helpers('./src/hbs/helpers/*.js')
        .data('./src/hbs/data/*.{js,json}'),
    )
    .pipe(gulp.dest('./dist/html/'));
}

gulp.watch(
  ['./src/html/**/*.html', './*.html', './src/hbs/**/*.hbs', './src/hbs/**/*.json'],
  gulp.series(compileHandlebars),
);

gulp.task('compileHandlebars', compileHandlebars);