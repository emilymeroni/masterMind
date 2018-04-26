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
const directoryMap = require("gulp-directory-map");
const karmaServer = require("karma").Server;

const CONST = {
    SRC_FOLDER: "src",
    DIST_FOLDER: "dist",
    DIST_FILENAME_JS: "masterMind.js",
    MIN_SUFFIX: ".min.js",
    JS_SOURCE_FILES: [
        "src/js/core.js",
        "src/js/Peg.js",
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

gulp.task("coverage", function (done) {
    // Use Karma only for the sake of producing a code coverage report
    new karmaServer({
        configFile: __dirname + "/test/karma.conf.js"
    }, done).start();
});

gulp.task("scss", function(){
    gulp.src(CONST.SCSS_FOLDER)
        .pipe(sourcemaps.init())
        .pipe(sass.sync().on("error", sass.logError))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(CONST.DIST_FOLDER));
});

gulp.task("dist", function() {
    concatAndMinify(CONST.JS_SOURCE_FILES, CONST.DIST_FILENAME_JS);
});

gulp.task("default", function(callback){
    runSequence(
        "dist",
        "scss",
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