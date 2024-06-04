import { Router } from 'express';
import { login } from '../controllers/auth-controller';
import bodyValidator from '../middlewares/body-validator';
import rescue from '../libs/rescue';
export const authRouter = Router();

/**
 * @openapi
 * '/auth':
 *   post:
 *     tags:
 *     - Auth
 *     summary: Login
 *     requestBody:
 *       description: Get token
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email of the user
 *               password:
 *                 type: string
 *                 description: Password of the user
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Token created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tempToken:
 *                   type: string
 *                   description: Unique identifier for the user
 *                 expiresAt:
 *                   type: string
 *                   description: Name of the user
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
 *                     example: ["email"]
 *                   message:
 *                     type: string
 *                     example: Required
 */
authRouter.post('/', [bodyValidator, rescue(login)]);

