import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";

import {
  uploadDocumentService,
  getDocumentsService,
  getDocumentByIdService,
  deleteDocumentService,
  downloadDocumentService,
  generateSummaryService,
  generateQuizService,
  generateFlashcardsService,
} from "../services/document.service";

interface DocumentParams {
  id: string;
}

export const uploadDocument = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({
        success: false,
        message: "Please upload a document.",
      });
      return;
    }

    const document = await uploadDocumentService(
      req.userId!,
      req.file
    );

    res.status(201).json({
      success: true,
      message: "Document uploaded successfully.",
      data: document,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// GEnerate Summary ========================================
export const generateSummary = async (

  req: AuthRequest,

  res: Response

): Promise<void> => {

  try {

    const summary = await generateSummaryService(

      String(req.params.id),

      req.userId!

    );

    res.status(200).json({

      success: true,

      summary,

    });

  } catch (error: any) {

    res.status(400).json({

      success: false,

      message: error.message,

    });
  }
};

// genereate Quiz ======================================
export const generateQuiz = async (

  req: AuthRequest,

  res: Response

): Promise<void> => {

  try {

    const quiz = await generateQuizService(

      String(req.params.id),

      req.userId!

    );

    res.status(200).json({

      success: true,
      quiz,
    });
  }

  catch (error: any) {

    res.status(400).json({

      success: false,
      message: error.message,
    });

  }
};

// =========================== flash card ======================
export const generateFlashcards = async (

  req: AuthRequest,
  res: Response

): Promise<void> => {

  try {

    const flashcards =
      await generateFlashcardsService(

        String(req.params.id),
        req.userId!
      );

    res.status(200).json({

      success: true,
      flashcards,
    });
  }

  catch (error: any) {

    res.status(400).json({

      success: false,
      message: error.message,
    });
  }
};

// get Document ==============================================
export const getDocuments = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const documents = await getDocumentsService(req.userId!);

    res.status(200).json({
      success: true,
      data: documents,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getDocument = async (
  req: AuthRequest & { params: DocumentParams },
  res: Response
): Promise<void> => {
  try {
    const document = await getDocumentByIdService(
      req.params.id,
      req.userId!
    );

    res.status(200).json({
      success: true,
      data: document,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
//= ========================= dlete docs ================
export const deleteDocument = async (
  req: AuthRequest & { params: DocumentParams },
  res: Response
): Promise<void> => {
  try {
    await deleteDocumentService(
      req.params.id,
      req.userId!
    );

    res.status(200).json({
      success: true,
      message: "Document deleted successfully.",
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
export const downloadDocument = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {

  try {

    const document =
      await downloadDocumentService(
        String(req.params.id),
        req.userId!
      );

    res.download(
      document.filePath,
      document.originalName
    );

  } catch (error: any) {

    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};