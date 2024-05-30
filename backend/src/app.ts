import * as express from 'express';
import * as cors from 'cors';
import * as logger from 'morgan';
import { routerUser } from './routes/user-route';

export const app = express.default();

app.use(express.json());
app.use(cors.default());
app.use(logger.default('dev'));

app.use("/user", routerUser);