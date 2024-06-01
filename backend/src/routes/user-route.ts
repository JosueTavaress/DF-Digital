import { Router } from 'express';
import { getAllUsers, createUser } from '../controllers/user-controller';
import { validateAuthorization } from '../middlewares/authorization';
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
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *       401:
 *         description: Unauthorized. Bearer token required.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Bearer token is required
 */
routerUser.get('/', [validateAuthorization, getAllUsers]);

/**
 * @openapi
 * '/user':
 *   post:
 *     tags:
 *     - User
 *     summary: Create a new user
 *     requestBody:
 *       description: User data to create a new user
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the user
 *               email:
 *                 type: string
 *                 description: Email of the user
 *               password:
 *                 type: string
 *                 description: Password of the user
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Unique identifier for the user
 *                 name:
 *                   type: string
 *                   description: Name of the user
 *                 email:
 *                   type: string
 *                   description: Email of the user
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   code:
 *                     type: string
 *                     example: invalid_type
 *                   expected:
 *                     type: string
 *                     example: string
 *                   received:
 *                     type: string
 *                     example: undefined
 *                   path:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["name"]
 *                   message:
 *                     type: string
 *                     example: Required
 */
routerUser.post('/', [bodyValidator, createUser]);