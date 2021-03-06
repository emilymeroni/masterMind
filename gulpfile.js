/* globals console, __dirname, require */
"use strict";

const gulp = require("gulp");
const changed = require("gulp-changed");
const concat = require("gulp-concat");
const rename = require("gulp-rename");
const runSequence = require("run-sequence");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const uglify = require("gulp-uglify");
const webserver = require("gulp-webserver");
const watch = require('gulp-watch');

const CONST = {
    SRC_FOLDER: "src",
    DIST_FOLDER: "dist",
    DIST_FILENAME_JS: "mastermind.js",
    MIN_SUFFIX: ".min.js",
    JS_SOURCE_FILES: [
        "src/js/core.js",
        "src/js/peg/Peg.js",
        "src/js/peg/CodePeg.js",
        "src/js/peg/KeyPeg.js",
        "src/js/hole/Hole.js",
        "src/js/hole/CodeHole.js",
        "src/js/hole/KeyHole.js",
        "src/js/row/Row.js",
        "src/js/row/CodeRow.js",
        "src/js/row/KeyRow.js",
        "src/js/rowholder/RowHolder.js",
        "src/js/board/Board.js",
        "src/js/PegChooser.js",
        "src/js/GameManager.js"
    ],
    SCSS_FOLDER: "src/sass/*.scss"
};

function concatAndMinify(src, fileName){
    return gulp.src(src)
        .pipe(sourcemaps.init())
        .pipe(concat(fileName))
        // The "changed" task needs to know the destination directory upfront
        .pipe(changed(CONST.DIST_FOLDER))
        .pipe(gulp.dest(CONST.DIST_FOLDER))
        .pipe(rename({
            extname: CONST.MIN_SUFFIX
        }))
        .pipe(uglify({
            mangle: false
        }))
        .pipe(sourcemaps.write(".", {
            includeContent: true,
            sourceRoot: "."
        }))
        .pipe(gulp.dest(CONST.DIST_FOLDER));
}

/* Tasks */

gulp.task("serve", ["dist"], function () {
    return gulp.src(".")
        .pipe(webserver({
            port: 3000,
            open: true
        }));
});

gulp.task("scss", function(){
    gulp.src(CONST.SCSS_FOLDER)
        .pipe(sourcemaps.init())
        .pipe(sass.sync().on("error", sass.logError))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(CONST.DIST_FOLDER));
});

gulp.task('copy', function () {
    return gulp.src(CONST.SRC_FOLDER + '/img/background.jpg')
        .pipe(gulp.dest(CONST.DIST_FOLDER));
});

gulp.task("dist", ["copy", "scss"], function() {
    concatAndMinify(CONST.JS_SOURCE_FILES, CONST.DIST_FILENAME_JS);
});

gulp.task("default", function(callback){
    runSequence(
        "dist",
        function(error){
            if(error){
                console.log(error.message);
            }
            else{
                console.log("BUILD FINISHED SUCCESSFULLY");
            }
            callback(error);
        });
});

gulp.task('stream', function () {
    // Endless stream mode
    return watch('js/**/*.js', concatAndMinify(CONST.JS_SOURCE_FILES, CONST.DIST_FILENAME_JS));
});