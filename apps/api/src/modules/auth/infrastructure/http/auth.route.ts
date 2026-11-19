import { Router } from "express";
import { AuthController } from "@modules/auth/infrastructure/http/auth.controller.js";
import { asyncWrapper } from "@infrastructure/util/async-wrapper.js";
import { validateRequest } from "@infrastructure/http/middleware/validate-request.js";
import { createSignUpSchema } from "@atlas/validators";
import { createHttpValidator } from "@infrastructure/security/http-req-validator.js";

const authRouter: Router = Router();

/**
 * @openapi
 * /api/auth/signup:
 *   post:
 *     tags: [Auth]
 *     summary: Sign up a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 maxLength: 128
 *                 description: Must contain at least one uppercase letter, one lowercase letter, one digit and one special character (!@#$&*)
 *                 example: Str0ng!Pass
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Created
 *                 httpStatusCode:
 *                   type: integer
 *                   example: 201
 *                 data:
 *                   type: object
 *                   required: [id, email, createdAt, updatedAt]
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       example: 3f1c2b9e-8a4d-4e6f-9b2a-1c5d7e8f9a0b
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: user@example.com
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2026-11-19T10:00:00.000Z
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2026-11-19T10:00:00.000Z
 *                     phone:
 *                       type: string
 *                       example: "+905551112233"
 *                 issues:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: []
 *       409:
 *         description: A user with the given email already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User with email user@example.com already exists
 *                 httpStatusCode:
 *                   type: integer
 *                   example: 409
 *                 issues:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: []
 *       400:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Validation failed
 *                 httpStatusCode:
 *                   type: integer
 *                   example: 400
 *                 issues:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Invalid email address", "Password is not strong enough"]
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 *                 httpStatusCode:
 *                   type: integer
 *                   example: 500
 *                 issues:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: []
 */
authRouter.post(
  "/signup",
  validateRequest(
    createHttpValidator({ createBodySchema: createSignUpSchema }),
  ),
  asyncWrapper(AuthController.signUp),
);

export { authRouter };
