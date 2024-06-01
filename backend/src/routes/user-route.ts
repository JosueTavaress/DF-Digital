import { Router } from 'express';
import { getAllUsers, createUser } from '../controllers/user-controller';
import bodyValidator from '../middlewares/body-validator';
export const routerUser = Router();
/**
 * @openapi
 * '/user':
 *   get:
 *     tags:
 *     - User
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: A list of Users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserSchema'
 *       400:
 *         description: Bad request
 */
routerUser.get('/', [getAllUsers]);

routerUser.post('/', [bodyValidator, createUser]);