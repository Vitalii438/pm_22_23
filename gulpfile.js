const { src, dest, parallel, series, watch } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cssnano = require("gulp-cssnano");
const rename = require("gulp-rename");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const htmlmin = require("gulp-htmlmin");
const imagemin = require("gulp-imagemin");
const jsmin = require("gulp-jsmin");
const browserSync = require("browser-sync").create();
const through = require('through2');


function serve(done) {
    browserSync.init({
        server: {
            baseDir: "dist"
        },
        port: 3000
    });
    done();
}

function reload(done) {
    browserSync.reload();
    done();
}

function watchFiles() {
    watch("develop/*.html", series(html_task, reload));
    watch("develop/css/*.css", series(css_task, reload));
    watch("develop/scss/*.scss", series(scss_task, reload));
    watch("develop/js/*.js", series(js_task, reload));
    watch("develop/img/*", series(img_task, reload));
}

const build = parallel(html_task, scss_task, css_task, img_task, js_task);
exports.default = series(build, serve, watchFiles);

function html_task(done) {
  return src("develop/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(through.obj(function(file, enc, cb) {
      if (!file.basename.startsWith('index')) {
        file.basename += '.min';
      }
      cb(null, file);
    }))
    .pipe(dest("dist"));
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
