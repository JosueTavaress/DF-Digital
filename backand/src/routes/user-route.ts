import { Router } from 'express';
import { getAllUsers } from '../controllers/user-controller';
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
 *         description: A list of Employees
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