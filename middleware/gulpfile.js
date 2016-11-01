/**
 * Created by anubhavshrimal on 19/7/16.
 */

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var jsmin = require('gulp-jsmin');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

// when typed gulp it will run the tasks specified in default task arrays
gulp.task('default', ["compress", "watch", "lint"]);

gulp.task('compress', function (){

    // get all the files and folders in public folder and copy them in public/target folder
    gulp.src("./public/*")
        .pipe(gulp.dest('./public/target'));
});

gulp.task('watch', function() {
    gulp.watch("./public/**/*.html", () => {
        console.log("watching")
    });
});

// show error or warnings in js files
gulp.task('lint', function() {
    var options = {
        "rules":{
            "camelcase": 1,
            "comma-dangle": 1,
            "quotes": 0
        }
    };

    gulp.watch("./*.js", function () {
        gulp.src("./*.js")
            .pipe(eslint(options))
            .pipe(eslint.format());
    });
});

// minifies the js file
gulp.task('minify', function () {

    gulp.src('./public/*.js')
        .pipe(jsmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist'))
});

// uglifies the js file
gulp.task('uglify', function () {

    gulp.src('./public/*.js')
        .pipe(uglify())
        .pipe(rename({suffix: '.ugly'}))
        .pipe(gulp.dest('dist'))
});

// combines all the js into one js
gulp.task('concat', function () {

    gulp.src('./public/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
});

// makes mapping of the uglified file so that reverse mapping can be done to regenerate the old un-uglified file
gulp.task('uglifymaps', function() {
    gulp.src('./public/*.js')
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename({suffix: '.ugly'}))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('dist'));
});
