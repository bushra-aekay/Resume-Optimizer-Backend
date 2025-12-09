import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './routes/resumeRoutes.js';
import dotenv from "dotenv";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

//Middleware

app.use(cors());
app.use(bodyParser.json());

//Test route
app.get('/', (req, res) => {
    res.send('Backend is running!');
});
app.use('/api/resume', router);

//Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
