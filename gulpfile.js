const { src, dest, task, series, watch} = require("gulp");
const rm = require("gulp-rm");
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
// const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const svgo =require("gulp-svgo");
const svgSprite = require("gulp-svg-sprite")

task("clean", () => {
  return src("dist/**/*", { read: false })
    .pipe(rm());
});

task("copy:html", () => {
  return src("src/*.html")
    .pipe(dest("dist"))
    .pipe(reload({ stream: true }))
});


task("copy:image", () => {
  return src("src/image/**/*.*")
  .pipe(dest("dist/image/"))
});

task("copy:video", () => {
  return src("src/video/*.*")
  .pipe(dest("dist/video/"))
});


const styles = [
  // "node_modules/@fancyapps/fancybox/dist/jquery.fancybox.css",
  "src/scss/main.scss"
];

task("styles", () => {
  return src(styles) 
    .pipe(sourcemaps.init())
    .pipe(concat('main.min.css'))
    // .pipe(sassGlob())
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(gcmq())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(dest("dist/css"));
});

const libs = [
  "node_modules/jquery/dist/jquery.js",
  "node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js",
  "node_modules/mobile-detect/mobile-detect.js",
  "node_modules/jquery-touchswipe/jquery.touchSwipe.js",
  "src/js/*.js"
]


task("scripts", () => {
  return src(libs)
    .pipe(sourcemaps.init())
    .pipe(concat('main.min.js', {newLine: ";"}))
    .pipe(babel({presets: ['@babel/env']}))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(dest("dist"))
})

// task("icons", () => {
//   return src("image/**/*.svg")
//     .pipe(svgo({
//       plugins: [
//         {
//           removeAttrs: {
//             attrs: "(fill|stroke|style|width|height|data.*)"
//           }
//         }
//       ]
//     })
//       .pipe(svgSprite({
//         mode: {
//           symbol: {
//             sprite: "../sprite.svg"
//           }
//         }
//       }))
//     ).pipe(dest("dist/image"));
// });

task('server', () => {
  browserSync.init({
      server: {
          baseDir: "./dist"
      },
  });
});

watch("src/scss/**/*.scss", series("styles"));
watch("src/*.html", series("copy:html"));
watch("src/js/*.js", series("scripts"));
watch("src/image/**/*.svg", series("scripts"));
task("default", series("clean", "copy:html", "copy:image", "copy:video", "styles", "scripts", "server"));


