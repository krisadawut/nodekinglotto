const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// const basicAuth = require('express-basic-auth');
const helmet = require("helmet");
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const blogRouter = require('./routes/blog');
const mbRouter = require('./routes/member');
const newsRouter = require('./routes/news');
const mbTypeRouter = require('./routes/memberType');
const ltTypeRouter = require('./routes/lotteryType');
const ltStatRouter = require('./routes/lotteryStat');
const periodRouter = require('./routes/period');
const ltplayRouter = require('./routes/lotteryPlay');
const payrateRouter = require('./routes/payrate');
const lottoPlaydtRouter = require('./routes/lottoplaydetail');
const authtatRouter = require('./routes/authenticate');
const app = express();
app.use(helmet());
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/blog', blogRouter);
// app.use('/api/blog', basicAuth({
//     users: { 'admin': '12345' }
// }), blogRouter);
app.use('/api/members', mbRouter);
app.use('/api/news', newsRouter);
app.use('/api/membertype', mbTypeRouter);
app.use('/api/lottotype', ltTypeRouter);
app.use('/api/lottostat', ltStatRouter);
app.use('/api/period', periodRouter);
app.use('/api/lotoplay', ltplayRouter);
app.use('/api/payrate', payrateRouter);
app.use('/api/lotoplaydt', lottoPlaydtRouter);
app.use('/api/authenticate', authtatRouter);
module.exports = app;