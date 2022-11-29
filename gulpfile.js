const sass = require('gulp-sass')(require('sass'));
const {src, dest, series, watch} = require('gulp')
const csso = require('gulp-csso')
const include = require('gulp-file-include')
const htmlmin = require('gulp-htmlmin')
const concat = require('gulp-concat')
const autoprefixer = require('gulp-autoprefixer');
const sync = require('browser-sync').create()

function html() {
    return src('src/**.html')
        .pipe(include({
            prefix: '@@'
        }))
        .pipe(dest('dist'))
}

function scss() {
    return src('src/style/**.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions']
        }))
        .pipe(csso())
        .pipe(concat('style.css'))
        .pipe(dest('dist'))
}

function serve() {
    sync.init({
        server: './dist'
    })

    watch('src/**.html', series(html)).on('change', sync.reload)
    watch('src/components/**.html', series(html)).on('change', sync.reload)
    watch('src/style/**.scss', series(scss)).on('change', sync.reload)
}

exports.build = series(scss, html)
exports.start = series(scss, html, serve)