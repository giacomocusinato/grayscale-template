'use strict';

var gulp = require('gulp'),
	sass = require('gulp-sass'),
    serve = require('gulp-serve');

var paths = {
	sass: './public/assets/sass/',
    js: [
    	'./public/vendor/jquery/dist/jquery.min.js',
	 	'./public/vendor/bootstrap-sass/assets/javascripts/bootstrap.min.js',
	 	'./public/vendor/jquery.easing/js/jquery.easing.min.js',
     	'./public/js/*.js'
    ],
	bower: './public/vendor/',
    cssDist: './dist/css/*css',
    jsDist: ['./dist/js/*.js', './dist/js/**/*.js']
}

gulp.task('css', function() {
    return gulp.src(paths.sass + 'grayscale.scss')
        .pipe(sass({
            includePaths: [paths.bower + 'bootstrap-sass/assets/stylesheets', 
            	paths.bower + 'font-awesome/scss'],
        }))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('fonts', function() {
	return gulp.src(['./public/assets/fonts/*', './public/vendor/font-awesome/fonts/*'])
		.pipe(gulp.dest('./dist/fonts'));
});

gulp.task('images', function() {
	return gulp.src('./public/assets/img/*')
		.pipe(gulp.dest('./dist/img'));
});

gulp.task('js', function() {
    return gulp.src(paths.js)
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('html', ['css', 'js'], function() {
	return gulp.src('public/index.html')
        .pipe(gulp.dest('./dist'));
});

gulp.task('build', ['html', 'css', 'js', 'fonts', 'images']);

gulp.task('serve', ['build'], serve('./dist'));

gulp.task('default', ['build']);