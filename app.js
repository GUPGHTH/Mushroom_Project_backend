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
// import hello2 from './routes/hello2.js'





const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

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
// qpp.use('/api/test',hello2)


export default app;