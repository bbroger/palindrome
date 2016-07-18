// Karma configuration
// Generated on Sat Jul 16 2016 06:56:22 GMT-0400 (EDT)

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: 'public/',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        // frameworks: ['jasmine', 'requirejs'],
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [

            //{ pattern: 'public/app/*.js', included: false },
            //{ pattern: 'public/app/components/**/*.js', included: false },
            //{ pattern: 'public/app/shared/directives/**/*.js', included: false },
            //{ pattern: 'public/test/*.js', included: false },
            //{ pattern: "public/bower_components/**/**/*.js", included: false },
            //'test-main.js'
            'bower_components/jquery/dist/jquery.js',
            'bower_components/angular/angular.js',
            'bower_components/angular-route/angular-route.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/angular-resource/angular-resource.js',
            'bower_components/angular-animate/angular-animate.js',
            'bower_components/angular-touch/angular-touch.js',
            'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
            'app/app.module.js',
            'app/app.routes.js',
            'app/shared/directives/directives.js',
            'app/shared/directives/editInLine.js',

            'app/components/message/messageController.js',
            'app/components/messages/messagesController.js',
            'app/components/message/messageService.js',


            /*'app/components/messages/messagesController.js',
            'app/components/message/messageService.js',
            'app/components/message/messageController.js',
            'app/shared/directives/editInLine.js',
            'app/shared/directives/directives.js',
            'app/app.routes.js',
            'app/app.module.js',*/
            { pattern: 'test/*.js' }

            /*
    <script src="bower_components/jquery/dist/jquery.js"></script>
    <script src="bower_components/angular/angular.js"></script>
    <script src="bower_components/angular-route/angular-route.js"></script>
    <script src="bower_components/angular-resource/angular-resource.js"></script>
    <script src="bower_components/angular-animate/angular-animate.js"></script>
    <script src="bower_components/angular-touch/angular-touch.js"></script>
    <script src="bower_components/angular-bootstrap/ui-bootstrap-tpls.js"></script>
    <script src="app/app.module.js"></script>
    <script src="app/app.routes.js"></script>
    <script src="app/shared/directives/directives.js"></script>
    <script src="app/shared/directives/editInLine.js"></script>
    <script src="app/components/message/messageController.js"></script>
    <script src="app/components/message/messageService.js"></script>
    <script src="app/components/messages/messagesController.js"></script>*/

        ],


        // list of files to exclude
        exclude: [
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    })
}
