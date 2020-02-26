module.exports = {
    /**
     * SASS / SCSS Configuration
     */
    sass: {
        src: [],
        watch: ["./assets/css/src/**/*.scss"],
        distFolder: "./assets/css/dist",
        minify: true,
        sourcemap: true
    },

    /**
     * JavaScript Configuration
     */
    javascript: {
        list: [],
        watch: ["./assets/js/src/**/*.js"],
        distFolder: "./assets/js/dist",
        minify: false,
        sourcemap: true
    },

    /**
     * React Configuration
     */
    react: {
        src: "./frontend/src/index.js",
        watch: ["./frontend/src/**/*.js"],
        distFolder: "./frontend/dist"
    },

    /**
     * BrowserSync Configuration
     */
    browserSync: {
        watch: [
            "./assets/css/dist/*.min.css",
            "./assets/js/dist/*.min.js",
            "./**/*.php"
        ],

        // Available config options
        // https://www.browsersync.io/docs/options
        config: {
            proxy: "http://test-wp-react-bare.local/",
            host: "test-wp-react-bare.local",
            watchTask: true,
            open: "external"
        }
    }
};
