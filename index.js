const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();


const { swaggerDocs: swagger1 } = require('./swagger');



const apiRouter = require('./routes/api');

require('./db')

const app = express();


const cors = require('cors');
const corsOptions = { origin: process.env.CORS_ORIGIN, credentiales: true, };
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors(corsOptions));

app.use('/api', apiRouter)






app.listen(process.env.PORT, () => {
    console.log('Server is running on port 3000');
    swagger1(app, process.env.PORT);
});

