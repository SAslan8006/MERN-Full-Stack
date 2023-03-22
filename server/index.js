const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const database = require('./config/database');
const authRouter = require('./routes/auth.js');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use('/',authRouter);
// Router Register


app.get('/', (req, res) => {
    res.json({ message: 'deneme deneme' });
});

const port = process.env.PORT;
 
database();

app.listen(port, () => {
    console.log(`Application running on port: ${port}`);
});
