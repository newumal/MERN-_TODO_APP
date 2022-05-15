import express, { Request, Response } from 'express';
import config from 'config';
import connect from "./utils/connect";
import routes from "./routes";
import cors from 'cors';
import bodyParser from 'body-parser';

const PORT = config.get<number>('PORT');

const app  = express();

const corsOption = {
    origin: `http://localhost${PORT}`
}
app.use(cors(corsOption));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', (req: Request, res: Response) => {
    res.send('Hello');
});

app.listen(PORT, async () => {
    console.log(`App is running at http://localhost:${PORT}`);
    await connect();
    routes(app);
});