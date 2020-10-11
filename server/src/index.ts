import express, { Application } from 'express';
import { PORT, mongoUri } from './config/constants';
import connect from './db';
import apiRouter from './routes';
import { createEmployees} from './seeder';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

app.use('/api', apiRouter);

connect(mongoUri);

createEmployees(50);

export default app;
