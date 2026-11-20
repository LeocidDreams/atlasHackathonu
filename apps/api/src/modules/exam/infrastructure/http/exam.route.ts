import { Router } from "express";
import { ExamController } from "@modules/exam/infrastructure/http/exam.controller.js";
import { asyncWrapper } from "@infrastructure/util/async-wrapper.js";

const examRouter: Router = Router();

/**
 * @openapi
 * /api/exam/generate-exam:
 *   post:
 *     tags: [Exam]
 *     summary: Generate an exam using the Exam knowledge base
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: Exam generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: exam generated successfully
 *                 httpStatusCode:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: ["object", "null"]
 *                   example: null
 *                 issues:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: []
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
examRouter.post("/generate-exam", asyncWrapper(ExamController.generateExam));

export { examRouter };
