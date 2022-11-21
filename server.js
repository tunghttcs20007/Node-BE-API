const express = require('express')
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const cors = require('cors')
const { readdirSync } = require('fs');
require('dotenv').config();

/** init app */
const app = express();

/** setup db */
const dbUri = process.env.MONGO_URI;
mongoose
	.connect(dbUri, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: true,
		useUnifiedTopology: true,
	})
	.then(() => console.info('SUCCESSFULLY CONNECT TO MONGODB'))
	.catch((error) => console.error(`DB CONNECTION ERROR ${error}`));

/** Middlewares */
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

/** Auto Loading Routes Middlewares */
readdirSync('./routes').forEach((route) => {
    app.use('/api/ecom-project', require(`./routes/${route}`)); 
});

/** Port */
const port = process.env.PORT || 8000;
app.listen(port, () => console.info(`Server is running on port ${port}`))
