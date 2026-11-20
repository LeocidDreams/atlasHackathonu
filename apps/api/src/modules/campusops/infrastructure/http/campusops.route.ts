import { Router } from "express";
import { validateRequest } from "@infrastructure/http/middleware/validate-request.js";
import { createHttpValidator } from "@infrastructure/security/http-req-validator.js";
import { createAskQuerySchema } from "@atlas/validators";
import { CampusOpsController } from "@modules/campusops/infrastructure/http/campusops.controller.js";
import { asyncWrapper } from "@infrastructure/util/async-wrapper.js";

const campusOpsRouter: Router = Router();

/**
 * @openapi
 * /api/campusops/ask:
 *   post:
 *     tags: [CampusOps]
 *     summary: Ask the CampusOps assistant a question
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [query]
 *             properties:
 *               query:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 2000
 *                 example: When is the add/drop deadline this semester?
 *               university:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 200
 *                 example: dokuz-eylul
 *     responses:
 *       200:
 *         description: Answer generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: OK
 *                 httpStatusCode:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: string
 *                   example: afa
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
 *                   example: ["Too small: expected string to have >=1 characters"]
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

campusOpsRouter.post(
  "/ask",
  validateRequest(
    createHttpValidator({ createBodySchema: createAskQuerySchema }),
  ),
  asyncWrapper(CampusOpsController.askQuery),
);

export { campusOpsRouter };
