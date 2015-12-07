var browserify = require('browserify')
var buffer = require('vinyl-buffer')
var coffeeify = require('coffeeify')
var config = require('./utils/config')
var del = require('del')
var gulp = require('gulp')
var imagemin = require('gulp-imagemin');
var source = require('vinyl-source-stream')
var transform = require('vinyl-transform')
var uglify = require('gulp-uglify')

var srcPaths = {
	sass: 'src/sass/**/*',
	coffee: './src/coffee/dodo.coffee',
	images: 'src/img/**/*'
}

var destPaths = {
	css: 'public/css',
	js: './public/js',
	images: 'public/img'
}

gulp.task('clean:all', function() {
	return del(['public'])
})

gulp.task('coffee', ['coffee:clean'], function() {
	
	var b = browserify({
		entries: './src/coffee/dodo.coffee',
		debug: false
	})

	b.transform(coffeeify, {
		bare: true
	})

	return b.bundle()
		.pipe(source('bundle.js'))
		.pipe(buffer())
		//.pipe(uglify())
		.pipe(gulp.dest('./public/js/'))
})

gulp.task('coffee:clean', function() {
	return del([destPaths.js])
})

gulp.task('sass', ['sass:clean'], function() {
	
})

gulp.task('sass:clean', function() {
	return del([destPaths.css])
})

gulp.task('images', ['images:clean'], function() {
	return gulp.src(srcPaths.images)
		.pipe(imagemin({optimizationLevel: config.gulp.image_optimization_level}))
		.pipe(gulp.dest(destPaths.images))
})

gulp.task('images:clean', function() {
	return del([destPaths.images])
})

gulp.task('watch', function() {
	gulp.watch(srcPaths.images, ['images'])
	gulp.watch(srcPaths.coffee, ['coffee'])
})

gulp.task('default', ['watch', 'images', 'coffee', 'sass'])