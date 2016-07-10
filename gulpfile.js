var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');

function onError(err) {
console.log(err);
}
gulp.task('default', function () {
    return gulp.src('styles/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('public/css'));
});
