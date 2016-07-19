var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var Server = require('karma').Server;

function onError(err) {
    console.log(err);
}
gulp.task('default', function () {
    return gulp.src('styles/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('public/assets/css'));
});

/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});

/**
 * Run test everytime files change
 */
gulp.task('testwatch', function (done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: false
    }, done).start();
});
