import Document from "../models/Document";
import { extractDocument } from "./parser.service";
import { deleteFile } from "./file.service";

import {
   indexDocument ,
   deleteIndexedDocument,
   generateSummary , 
   generateQuiz,
   generateFlashcards,
   searchDocuments,
   generateNotes,
   } from "./ai.service"

export const uploadDocumentService = async (
  userId: string,
  file: Express.Multer.File
) => {

  const parsedDocument = await extractDocument(
    file.path,
    file.mimetype
  );

  const document = await Document.create({
    fileName: file.filename,

    originalName: file.originalname,

    fileType: file.mimetype,

    fileSize: file.size,

    filePath: file.path,

    text: parsedDocument.text,

    uploadedBy: userId,
  });

  try{
    
    await indexDocument(
      document._id.toString(),
      userId,
      document.originalName,
      parsedDocument.text
    );

    console.log("Document indexed successfully." );

  }
  catch(error){

    console.error("Document uploaded but AI indexing failed.");

  }

  return document;
};

export const getDocumentsService = async (
  userId: string
) => {

  return await Document.find({
    uploadedBy: userId,
  }).sort({
    createdAt: -1,
  });

};

export const getDocumentByIdService = async (
  id: string,
  userId: string
) => {

  const document = await Document.findOne({
    _id: id,
    uploadedBy: userId,
  });

  if (!document) {
    throw new Error("Document not found.");
  }

  return document;
};


export const deleteDocumentService = async (
  id: string,
  userId: string
) => {

  const document = await Document.findOne({
    _id: id,
    uploadedBy: userId,
  });

  if (!document) {
    throw new Error("Document not found.");
  }

  // Delete uploaded file
  await deleteFile(document.filePath);

  // Delete embeddings from ChromaDB ========================

  try {

    await deleteIndexedDocument(
      document._id.toString()
    );

    console.log(
      "Document embeddings deleted successfully."
    );

  } catch (error) {

    console.error(
      "Failed to delete document embeddings."
    );

  }

  // Delete MongoDB document =====================
  await Document.findByIdAndDelete(id);

  return document;
};

//==================== download docs ====================
export const downloadDocumentService = async (
  id: string,
  userId: string
) => {

  const document = await Document.findOne({
    _id: id,
    uploadedBy: userId,
  });

  if (!document) {
    throw new Error("Document not found.");
  }

  return document;
};

// ======================genrate summary ========================
export const generateSummaryService = async (

  documentId: string,
  userId: string

) => {

  const document = await Document.findOne({

    _id: documentId,

    uploadedBy: userId,

  });

  if (!document) {

    throw new Error("Document not found.");

  }

  if (document.summary && document.summary.length > 0) {

    return document.summary;

  }

  const summary = await generateSummary(

    userId,
    documentId
  );

  document.summary = summary;
  await document.save();
  return summary;
};

// =================== GEneratae notes===========================
export const generateNotesService = async (
  documentId: string,
  userId: string
) => {

  const document = await Document.findOne({
    _id: documentId,
    uploadedBy: userId,
  });

  if (!document) {
    throw new Error("Document not found.");
  }
  if (
    document.notes &&
    document.notes.length > 0
  ) {
    return document.notes;
  }

  const notes = await generateNotes(
    userId,
    documentId
  );

  document.notes = notes;
  await document.save();
  return notes;
};

// ======================== flashcards =========================
export const generateFlashcardsService = async (
  documentId: string,
  userId: string
) => {

  const document = await Document.findOne({
    _id: documentId,
    uploadedBy: userId,
  });

  if (!document) {
    throw new Error("Document not found.");
  }

  if (document.flashcards && document.flashcards.length > 0)
    {
    return document.flashcards;
  }

  const flashcards = await generateFlashcards(
    userId,
    documentId
  );

  document.flashcards = flashcards ;
  await document.save();

  return flashcards;
};

//================ generate Quiz ================================
export const generateQuizService = async (

    documentId: string,

    userId: string

) => {

    const document = await Document.findOne({

        _id: documentId,

        uploadedBy: userId,

    });

    if (!document) {

        throw new Error("Document not found.");

    }

    if (
        document.quiz &&
        document.quiz.length > 0
    ) {

        return document.quiz;

    }

    const quiz = await generateQuiz(

        userId,

        documentId

    );

    document.quiz = quiz;

    await document.save();

    return quiz;
};
// ================== search documents=========================
export const searchDocumentsService = async (
  userId: string,
  query: string
) => {

  return await searchDocuments(
    userId,
    query
  );

};
