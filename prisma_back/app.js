import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRoute from './routes/userRoute.js';
import farmRoute from './routes/farmRoute.js';
import deviceRoute from './routes/deviceRoute.js';
import potTypeRoute from './routes/potTypeRoute.js';
import cultivationRoute from './routes/cultivationRoute.js';
import growingRoute from './routes/growingRoute.js';
import viewCultivationRoute from './routes/viewCultivationRoute.js';
import viewGrowingRoute from './routes/viewGrowingRoute.js';
import authRoute from './routes/authRoute.js'

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use(bodyParser.json({ limit: '50mb' }));

// Increase URL-encoded payload limit to 50MB
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// If you're using Express 4.16+ you can use built-in middleware instead:
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.use('/api/user', userRoute);
app.use('/api/farm', farmRoute);
app.use('/api/device', deviceRoute);
app.use('/api/mushroom', potTypeRoute);
app.use('/api/cultivation', cultivationRoute);
app.use('/api/growing', growingRoute);
app.use('/api/viewCultivation', viewCultivationRoute);
app.use('/api/viewGrowing', viewGrowingRoute);
app.use('/api/auth', authRoute)


export default app;