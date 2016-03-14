'use strict';

var gulp = require('gulp'),
	sass = require('gulp-sass'),
    inject = require('gulp-inject'),
    serve = require('gulp-serve');

var paths = {
	sass: './public/assets/sass/',
    js: ['./public/vendor/angular/angular.js', './public/js/*.js'],
	bower: './public/vendor/',
    cssDist: './dist/css/*css',
    jsDist: ['./dist/js/*.js', './dist/js/**/*.js']
}

var injectOptions = {
    ignorePath: 'dist',
    addRootSlash: false
}

gulp.task('css', function() {
    return gulp.src(paths.sass + 'main.scss')
        .pipe(sass({
            includePaths: [paths.bower + 'bootstrap-sass/assets/stylesheets'],
        }))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('js', function() {
    return gulp.src(paths.js)
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('inject', ['css', 'js'], function() {
	return gulp.src('public/index.html')
		.pipe(inject(gulp.src(paths.cssDist, {read: false}), injectOptions))
        .pipe(inject(gulp.src(paths.jsDist, {read: false}), injectOptions))
        .pipe(gulp.dest('./dist'));
});

gulp.task('build', ['inject']);

gulp.task('serve', ['build'], serve('./dist'));

gulp.task('default', ['build']);