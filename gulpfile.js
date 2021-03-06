var browserify = require('browserify')
var buffer = require('vinyl-buffer')
var coffeeify = require('coffeeify')
var concat = require('gulp-concat')
var del = require('del')
var gulp = require('gulp')
var imagemin = require('gulp-imagemin');
var liveReload = require('gulp-livereload')
var plumber = require('gulp-plumber')
var rename = require('gulp-rename')
var sass = require('gulp-sass')
var source = require('vinyl-source-stream')
var transform = require('vinyl-transform')
var uglify = require('gulp-uglify')

var config = require('./utils/config')

var srcPaths = {
	coffee: './src/coffee/*',
	coffeeEntry: './src/coffee/dodo.coffee',
	fonts: [
		'node_modules/materialize-css/font/!(material-design-icons)/**/*'
	],
	images: 'src/img/**/*',
	libs: [ // loaded before bundle.js
		'node_modules/jquery/dist/jquery.js',
		'node_modules/materialize-css/dist/js/materialize.js'
	],
	sass: 'src/sass/**/*',
	views: 'views/**/*'
}

var destPaths = {
	css: 'public/css',
	js: './public/js/bundle.js',
	jsDir: './public/js/',
	images: 'public/img',
	libs: 'public/js/',
	fonts: 'public/font'
}

gulp.task('all:clean', function() {
	return del(['public'])
})


// concate dependencies of non-browserifyable stuff

gulp.task('libs', ['libs:clean'], function() {
	return gulp.src(srcPaths.libs)
		.pipe(concat('libs.js'))
		//.pipe(uglify())
		.pipe(gulp.dest(destPaths.libs))
})

gulp.task('libs:clean', function() {
	return del([destPaths.libs])
})


// bundling private scripts

gulp.task('bundle', ['bundle:clean', 'sass'], function() {
	var b = browserify({
		entries: srcPaths.coffeeEntry,
		debug: false
	})

	b.transform(coffeeify)

	return b.bundle()
		.pipe(plumber())
		.on('error', function(err) {
			console.log(err.message)
			this.emit('end')
		})
		.pipe(source('bundle.js'))
		.pipe(buffer())
		//.pipe(uglify())
		.pipe(gulp.dest(destPaths.jsDir))
		.pipe(liveReload())
})

gulp.task('bundle:clean', function() {
	return del([destPaths.js])
})


// private + external sass

gulp.task('sass', ['sass:clean'], function() {
	return gulp.src('./src/sass/styles.sass')
		.pipe(plumber())
		.pipe(sass().on('error', sass.logError))
		.pipe(rename('bundle.css'))
		.pipe(gulp.dest(destPaths.css))
		.pipe(liveReload())
})

gulp.task('sass:clean', function() {
	return del([destPaths.css])
})


// minifying images

gulp.task('images', ['images:clean'], function() {
	return gulp.src(srcPaths.images)
		.pipe(imagemin({optimizationLevel: config.gulp.image_optimization_level}))
		.pipe(gulp.dest(destPaths.images))
})

gulp.task('images:clean', function() {
	return del([destPaths.images])
})


// copying fonts

gulp.task('fonts', ['fonts:clean'], function() {
	return gulp.src(srcPaths.fonts)
		.pipe(gulp.dest(destPaths.fonts))
})

gulp.task('fonts:clean', function() {
	return del(destPaths.fonts)
})


// listening for changes in /views
gulp.task('views', function() {
	return gulp.src(srcPaths.views)
		.pipe(liveReload())
})

// watch

gulp.task('watch', function() {
	liveReload.listen()
	gulp.watch(srcPaths.images, ['images'])
	//gulp.watch(srcPaths.coffee, ['coffee'])
	gulp.watch([srcPaths.coffee], ['bundle'])
	gulp.watch(srcPaths.sass, ['sass'])
	gulp.watch(srcPaths.views, ['views'])
})

gulp.task('default', ['watch', 'bundle', 'libs', 'sass', 'images', 'fonts'])