const { src, dest, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cssnano = require("gulp-cssnano");
const rename = require("gulp-rename");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const htmlmin = require("gulp-htmlmin");
const imagemin = require("gulp-imagemin");
const jsmin = require("gulp-jsmin");

const build = parallel(html_task, scss_task, css_task, img_task, js_task);
exports.default = build;

function html_task(done) {
    return (
    src("develop/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(rename({ suffix: ".min" }))
        .pipe(dest("dist"))
    );
}

function css_task(done) {
    return (
    src("develop/css/*.css")
        .pipe(cssnano())
        .pipe(rename({ suffix: ".min" }))
        .pipe(dest("dist/css"))
    );
}

function scss_task(done) {
  return (
    src("develop/scss/*.scss")
      .pipe(sass())
      .pipe(cssnano())
      .pipe(rename({ suffix: ".min" }))
      .pipe(dest("dist/css"))
  );
}

function img_task(done) {
  return src("develop/img/*")
    .pipe(imagemin())
    .pipe(rename({ suffix: ".min" }))
    .pipe(dest("dist/img")
);
}

function js_task(done) {
    return (
    src("develop/js/*.js")
        .pipe(jsmin())
        .pipe(rename({ suffix: ".min" }))
        .pipe(dest("dist/js"))
    );
}
