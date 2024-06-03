import { Router } from 'express';
import { getAllUsers, createUser, updateUser, deleteUser } from '../controllers/user-controller';
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

/**
 * @openapi
 * '/user/{id}':
 *   put:
 *     tags:
 *     - User
 *     summary: Update a user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Unique identifier for the user
 *     requestBody:
 *       description: User data to update a user
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
 *               user_links_tag:
 *                 oneOf:
 *                   - type: array
 *                     items:
 *                       type: number
 *                   - type: array
 *                     items:
 *                       type: integer
 *             required:
 *               - name
 *               - email
 *     responses:
 *       '200':
 *         description: User updated successfully
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
 *                 user_links_tag:
 *                   type: array
 *                   items:
 *                     type: number
 *                     description: Unique identifier for the user's links tag
 *       '400':
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
 *                     example: invalid_union
 *                   unionErrors:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         issues:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               code:
 *                                 type: string
 *                                 example: invalid_type
 *                               expected:
 *                                 type: string
 *                                 example: array
 *                               received:
 *                                 type: string
 *                                 example: undefined
 *                               path:
 *                                 type: array
 *                                 items:
 *                                   type: string
 *                               message:
 *                                 type: string
 *                                 example: Required
 *                         name:
 *                           type: string
 *                           example: ZodError
 *                   path:
 *                     type: array
 *                     items:
 *                       type: string
 *                   message:
 *                     type: string
 *                     example: Invalid input
 */
routerUser.put('/:id', [validateAuthorization, bodyValidator, updateUser]);

routerUser.delete('/:id', [validateAuthorization, deleteUser]);