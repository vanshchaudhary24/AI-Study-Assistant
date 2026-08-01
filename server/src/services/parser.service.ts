import fs from "fs/promises";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";
import { ParsedDocument } from "../types/document.types";

export const extractDocument = async (
  filePath: string,
  mimeType: string
): Promise<ParsedDocument> => {

  switch (mimeType) {

    case "application/pdf":
      return extractPDF(filePath);

    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return extractDOCX(filePath);

    case "text/plain":
      return extractTXT(filePath);

    default:
      throw new Error("Unsupported document type.");

  }

};

const extractPDF = async (
  filePath: string
): Promise<ParsedDocument> => {

  const buffer = await fs.readFile(filePath);

  const pdf = await pdfParse(buffer);

  return {
    text: pdf.text,
    pageCount: pdf.numpages,
    metadata: pdf.info
  };

};

const extractDOCX = async (
  filePath: string
): Promise<ParsedDocument> => {

  const result = await mammoth.extractRawText({
    path: filePath
  });

  return {
    text: result.value,
    pageCount: 1,
    metadata: {}
  };

};

const extractTXT = async (
  filePath: string
): Promise<ParsedDocument> => {

  const text = await fs.readFile(filePath, "utf8");

  return {
    text,
    pageCount: 1,
    metadata: {}
  };

};