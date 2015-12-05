var IMAGE_OPTIMIZATION_LEVEL = 0;

var gulp = require('gulp')
var del = require('del')
var imagemin = require('gulp-imagemin');

var srcPaths = {
	sass: 'src/sass/**/*',
	coffee: 'src/coffee/**/*',
	images: 'src/img/**/*'
}

var destPaths = {
	css: 'public/css',
	coffee: 'public/js',
	images: 'public/img'
}

gulp.task('clean', function() {
	return del(['public'])
})

gulp.task('coffee', ['clean'], function() {
	
})

gulp.task('sass', ['clean'], function() {
	
})

gulp.task('images', ['clean'], function() {
	return gulp.src(srcPaths.images)
		.pipe(imagemin({optimizationLevel: IMAGE_OPTIMIZATION_LEVEL}))
		.pipe(gulp.dest(destPaths.images))
})

gulp.task('watch', function() {
	gulp.watch(srcPaths.images, ['images'])
})


gulp.task('default', ['watch', 'images', 'coffee', 'sass', 'jade'])