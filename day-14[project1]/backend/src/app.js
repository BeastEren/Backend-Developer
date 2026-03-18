const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRouter = require('./routes/auth.routes');
const postRouter = require('./routes/post.routes');
const userRouter = require('./routes/user.routes');

const app = express();
const corsOptions = {
    origin: 'https://backend-developer-beta.vercel.app',
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "..", 'public')));
// app.use(express.static("./public"));

app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);
app.use('/api/users', userRouter);


app.use('*name', (req, res) => {
    res.sendFile(path.join(__dirname, "..", 'public', 'index.html'));
})
module.exports = app;