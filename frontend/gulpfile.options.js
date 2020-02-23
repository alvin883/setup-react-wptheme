module.exports = {
    /**
     * SASS / SCSS Configuration
     */
    sass: {
        src: [
            "./assets/css/src/wp-admin.scss",
            "./assets/css/src/wp-login.scss",
            "./assets/css/src/styles.scss"
        ],
        watch: ["./assets/css/src/**/*.scss"],
        distFolder: "./assets/css/dist",
        minify: true,
        sourcemap: true
    },

    /**
     * JavaScript Configuration
     */
    javascript: {
        list: [
            "./assets/js/src/single-js.js",
            {
                name: "themes",
                src: [
                    "./node_modules/jquery/dist/jquery.js",
                    "./assets/js/src/themes/index.js",
                    "./assets/js/src/themes/about.js",
                    "./assets/js/src/themes/contact.js"
                ]
            },
            {
                name: "vendors",
                src: [
                    "./node_modules/jquery/dist/jquery.js",
                    "./node_modules/swiper/js/swiper.js"
                ],
                polyfill: false
            },
            {
                name: "main",
                src: [
                    "./assets/js/src/main/test.js",
                    "./assets/js/src/main/another-test.js"
                ]
            }
        ],
        watch: ["./assets/js/src/**/*.js"],
        distFolder: "./assets/js/dist",
        minify: false,
        sourcemap: true
    },

    /**
     * React Configuration
     */
    react: {
        src: "./src/index.js",
        watch: ["./src/**/*.js"],
        distFolder: "./dist"
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
            proxy: "http://projectname.local/",
            host: "projectname.local",
            watchTask: true,
            open: "external"
        }
    }
};
