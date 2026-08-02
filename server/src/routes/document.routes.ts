import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { uploadDocument } from "../middleware/documentUpload.middleware";

import {
  uploadDocument as upload,
  getDocuments,
  getDocument,
  deleteDocument,
  downloadDocument, 
  generateSummary,
  generateQuiz,
  generateFlashcards,
  searchDocuments,
  generateNotes,
} from "../controllers/document.controller";

const router = Router();

router.post(
  "/upload",
  authenticate,
  uploadDocument.single("document"),
  upload
);

router.post(
  "/search",
  authenticate,
  searchDocuments
);

router.get(
  "/",
  authenticate,
  getDocuments
);


router.get(
  "/:id/download",
  authenticate,
  downloadDocument
);

router.post(
  "/:id/summary",
  authenticate,
  generateSummary
);

router.post(
  "/:id/notes",
  authenticate,
  generateNotes
);

router.post(
  "/:id/quiz",
  authenticate,
  generateQuiz
);

router.post(
  "/:id/flashcards",
  authenticate,
  generateFlashcards
);

router.get(
  "/:id",
  authenticate,
  getDocument
);

router.delete(
  "/:id",
  authenticate,
  deleteDocument
);

export default router;