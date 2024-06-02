import * as express from 'express';
import * as cors from 'cors';
import * as logger from 'morgan';
import 'dotenv/config'
import { routerUser } from './routes/user-route';
import { authRouter } from './routes/auth-route';
import { tagRouter } from './routes/tag-route';

export const app = express.default();

app.use(express.json());
app.use(cors.default());
app.use(logger.default('dev'));

app.use("/user", routerUser);
app.use("/auth", authRouter);
app.use("/tag", tagRouter);