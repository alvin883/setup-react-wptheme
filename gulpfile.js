require("dotenv").config();

const gulp = require("gulp");
const gulpPlumber = require("gulp-plumber");
const gulpAutoprefixer = require("gulp-autoprefixer");
const gulpSass = require("gulp-sass");
const gulpRename = require("gulp-rename");
const gulpSourcemaps = require("gulp-sourcemaps");
const gulpNotify = require("gulp-notify");
const gulpIf = require("gulp-if");
const browsersync = require("browser-sync");
const browserSync = browsersync.create();
const gulpOptions = require("./gulpfile.options");
const path = require("path");
const yargs = require("yargs");
const cliArgs = yargs.array("not").boolean("production");

// Webpack for React App
const webpack = require("webpack");
const webpackStream = require("webpack-stream");
const webpackConfigDev = require("./webpack.config").development;
const webpackConfigProd = require("./webpack.config").production;

// Check the environment, both from CLI or ENV
const _mode_cli = cliArgs && cliArgs.argv.production ? true : false;
const _mode_nodeenv = process.env.NODE_ENV === "production";
const isProduction = _mode_cli || _mode_nodeenv;

/**
 * Will be inserted as options for node-sass
 * @link https://github.com/sass/node-sass#options
 */
const sassOptions = {
    errLogToConsole: true,
    precision: 8,
    noCache: true
};

/**
 * SASS Compiler, without watcher
 */
gulp.task("compile-sass", function() {
    let { sourcemap, minify, src } = gulpOptions.sass;
    const onSuccess = gulpNotify({
        title: "SASS",
        message: "All Compiled!",
        onLast: true
    });

    // Check environment
    if (isProduction) {
        minify = true;
        sourcemap = false;
    }

    const _sassOptions = {
        ...sassOptions,
        outputStyle: minify ? "compressed" : "nested"
    };

    // Check --not option from the cli
    if (cliArgs && cliArgs.argv.not) {
        src = src.filter(item => {
            let extension = path.extname(item);
            let name = path.basename(item, extension);

            return !cliArgs.argv.not.includes(name);
        });
    }

    return gulp
        .src(src)
        .pipe(gulpIf(minify, gulpRename({ suffix: ".min" })))
        .pipe(gulpSourcemaps.init())
        .pipe(gulpPlumber())
        .pipe(gulpSass(_sassOptions))
        .pipe(gulpAutoprefixer())
        .pipe(gulpIf(sourcemap, gulpSourcemaps.write(".")))
        .pipe(gulp.dest(gulpOptions.sass.distFolder))
        .pipe(onSuccess);
});

/**
 * SASS Watcher
 * it will run compiler first and then watch for file changes
 */
gulp.task("watch-sass", function() {
    gulp.watch(gulpOptions.sass.watch, gulp.series("compile-sass"));
});

/**
 * Browsersync
 * Reload browser on file changes
 */
gulp.task("browser-sync", function() {
    browserSync.init(
        gulpOptions.browserSync.watch,
        gulpOptions.browserSync.config
    );
    gulp.watch(gulpOptions.browserSync.watch).on("change", function() {
        browserSync.reload();
    });
});

/**
 * React App
 * Run Webpack for compiling React app
 */
gulp.task("compile-react", function() {
    const config = isProduction ? webpackConfigProd : webpackConfigDev;
    const { src, distFolder } = gulpOptions.react;
    const onSuccess = gulpNotify({
        title: "React",
        message: "All Compiled!",
        onLast: true
    });

    return gulp
        .src(src, { since: gulp.lastRun("compile-react") })
        .pipe(webpackStream(config, webpack))
        .pipe(gulp.dest(distFolder))
        .pipe(onSuccess);
});

/**
 * React App Watcher
 * it will watch for React file changes
 */
gulp.task("watch-react", function() {
    const { watch } = gulpOptions.react;
    gulp.watch(watch, gulp.series("compile-react"));
});

/**
 * Default gulp command
 */
gulp.task(
    "default",
    gulp.parallel([
        gulp.series("compile-react"),
        gulp.series("watch-sass"),
        gulp.series("watch-react"),
        gulp.series("browser-sync")
    ])
);
