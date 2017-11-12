var gulp = require('gulp'),
	child = require('child_process');
var plugins = require('gulp-load-plugins')();
var autoprefixer = require('autoprefixer');
gulp.task('watch', function() {
	plugins.livereload.listen();
	var oldWatchPath = ['**/*.+(js|css|jsp|less)', '!{node_modules, .svn, images, mobile/images, mobile/images2 }/**'];
	var newWatchPath = ['./mobile/*.*', './mobile/**/*.*'];
	var lessOutPutPath = './yahu/dwu/css';
	gulp.watch(oldWatchPath, (z) => {
		console.log(z)
		if(z.path.indexOf('.less') !== -1) { //监听到less修改
			gulp.src([z.path]) // 要压缩的css文件
				.pipe(plugins.less())
				.pipe(plugins.postcss([
					autoprefixer({ browsers: ['last 100 version'] }),
				]))
//				.pipe(plugins.concat('index.min.css'))
				.pipe(gulp.dest(lessOutPutPath));
				return;
		};
		child.execFile("E:\\work\\lg8.bat", [], { cwd: "E:\\work\\lg8" }, (e, x, y) => {
			gulp.src(z.path).pipe(plugins.livereload())  
		});
	});
});
gulp.task('default', ['watch']);