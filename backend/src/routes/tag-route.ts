import { Router } from 'express';
import { getTags } from '../controllers/tag-controller';
import { validateAuthorization } from '../middlewares/authorization';

export const tagRouter = Router();

/**
 * @openapi
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * 
 * security:
 *   - bearerAuth: []
 * 
 * '/tag':
 *   get:
 *     tags:
 *     - Tag
 *     summary: Get all Tags
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of Tags
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   color:
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
tagRouter.get('/', [validateAuthorization, getTags]);