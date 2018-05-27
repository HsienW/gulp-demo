const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const jade = require('gulp-jade');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');

gulp.task('jade', function() {
    gulp.src('./source/*.jade')
        .pipe(plumber())
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('./public/'))
});

// gulp.task('concat', function () {
//     gulp.src('./source/**/*.js')
//         .pipe(plumber())
//         .pipe(concat('all.js'))
//         .pipe(uglify())
//         .pipe(gulp.dest('./public/js'))
// });

gulp.task('sass', function () {
    const plugins = [
        autoprefixer({browsers: ['last 3 version']})
    ];

    return gulp.src('./source/**/*.scss')
        .pipe(plumber())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(postcss(plugins))
        .pipe(gulp.dest('./public/style'))
});

gulp.task('babel', () =>
    gulp.src('./source/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(concat('all.js'))
        // .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./public/js'))
);

gulp.task('watch', function () {
    gulp.watch('./source/**/*.scss', ['sass']);
});

gulp.task('default', ['jade', 'sass', 'babel', 'watch']);
