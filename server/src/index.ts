import express, { Application, NextFunction, Response, Request } from 'express';
import { PORT, mongoUri } from './config/constants';
import connect from './db';
import apiRouter from './routes';
import { createEmployees} from './seeder';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

app.use('/api', apiRouter);

connect(mongoUri);

createEmployees(50);

export default app;
