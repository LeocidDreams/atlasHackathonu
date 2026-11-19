import { Router } from "express";
import { UploadController } from "@modules/upload/infrastructure/http/upload.controller.js";
import { asyncWrapper } from "@infrastructure/util/async-wrapper.js";

const uploadRouter: Router = Router();

/**
 * @openapi
 * /api/upload:
 *   post:
 *     tags: [Upload]
 *     summary: Upload a file
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [file]
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: File to upload
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: upload endpoint
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
uploadRouter.post("/upload", asyncWrapper(UploadController.upload));

export { uploadRouter };
