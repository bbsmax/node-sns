const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const flash = require('connect-flash'); //웹브라우저에 1회성 메세지를 만들때.
const { sequelize } = require('./models');

require('dotenv').config();

//const, let
//const 는 상수를 선언. 선언후 값을 바로 설정, 값 설정후 값을 바꿀수 없다.
//let 변수선언, 값 변경 가능.
//const로 선언한 객체는 객체의 요소값은 변경이 가능.

console.log("::: env ::::", process.env.NODE_ENV)

const indexRouter = require('./routes/page');
const userRouter = require('./routes/user');
sequelize.sync();

const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('port', process.env.PORT || 8001);

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));

app.use(flash());
app.use('/', indexRouter);

// app.use((req, res, next) => {
//     const err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

app.use((err, req, res) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
})

app.listen(app.get('port'), () => {
    console.log(`${app.get('port')}번 포트에서 서버가 실행중입니다.`);
})