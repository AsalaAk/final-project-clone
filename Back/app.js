var express = require('express');
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cors = require('cors');
app.use(cors());

const userRouter = require('./routers/user-routes');
app.use('/users', userRouter);


app.use(express.static('public'));
//=========================
app.listen(3001, function () {
    console.log('My app is listening on port 3001!');
});


