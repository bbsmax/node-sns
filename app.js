const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const flash = require('connect-flash'); //웹브라우저에 1회성 메세지를 만들때.
const app = express();
require('dotenv').config();

app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('port', process.env.PORT || 8001);

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave : false,
    saveUninitialized : false,
    secret : process.env.COOKIE_SECRET,
    cookie : {
        httpOnly : true,
        secure : false,
    },
}));

app.use(flash());

app.listen(app.get('port'), () => {
    console.log(`${app.get('port')}번 포트에서 서버가 실행중입니다.`);
})