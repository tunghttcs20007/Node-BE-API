const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const { readdirSync } = require('fs');
const swaggerUI = require('swagger-ui-express');
const swaggerDoc = require('swagger-jsdoc');
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

/** Setup swagger */
const options = {
	explore: true,
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'TechShop Ecom RestAPI',
			version: '1.0.0',
			description:
				'### This document includes all API endpoints of the TechShop Ecom project' +
				'\n*All enpoints are used to test and demonstrate the APIs with MongoDB*',
		},
		servers: [
			{ url: process.env.SWAGGER_SERVERS, description: 'TechShop API Base URL' },
			{
				url: process.env.FIREBASE_AUTH_SERVERS,
				description: 'Only For Testing Purpose',
			},
		],
	},
	apis: ['./routes/*.js', './swagger/*.js'],
};

const specs = swaggerDoc(options);

/** Middlewares */
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '2mb' }));
app.use('/ecom/api/docs', swaggerUI.serve, swaggerUI.setup(specs));
app.use(cors());

/** Auto Loading Routes Middlewares */
readdirSync('./routes').forEach((route) => {
	app.use('/ecom/api', require(`./routes/${route}`));
});

/** Port */
const port = process.env.PORT || 8000;
app.listen(port, () => console.info(`Server is running on port ${port}`));
