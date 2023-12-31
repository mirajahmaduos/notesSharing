const express = require('express');
const cors = require("cors");
require('./models/db');


const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
//serve files from upload directory
app.use('/uploads', express.static('uploads'));
// routers
app.use('/signup', require('./routes/signup'))
app.use('/login', require('./routes/login'))
app.use('/upload', require('./routes/upload'))
app.use('/viewallnotes', require('./routes/viewallnotes'))
app.use('/pendingnotes', require('./routes/pendingnotes'));
app.use('/mynotes', require('./routes/myNotes'));
//app.use('/status', require('./routes/status'))

app.listen(5000, () => {
    console.log(`App running on port 5000`)
});