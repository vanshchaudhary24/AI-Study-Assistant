import api from "./api";

import type {
  UploadResponse,
  DocumentsResponse,
  SummaryResponse,
} from "../types/document";

export const uploadDocument = async (
  file: File
): Promise<UploadResponse> => {

  const formData = new FormData();

  formData.append(
    "document",
    file
  );

  const response = await api.post(
    "/documents/upload",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const getDocuments =
  async (): Promise<DocumentsResponse> => {

    const response =
      await api.get("/documents");
    return response.data;
  };

export const deleteDocument =
  async (id: string) => {

    return api.delete(
      `/documents/${id}`
    );
  };


export const downloadDocument = async (id: string) => {

  const response = await api.get(
    `/documents/${id}/download`,
    {
      responseType: "blob",
    }
  );

  const url = window.URL.createObjectURL(response.data);

  const link = document.createElement("a");

  link.href = url;
  link.download = "";
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);

};


export const previewDocument = async (
  id: string
) => {

  const response = await api.get(
    `/documents/${id}/download`,
    {
      responseType: "blob",
    }
  );

  const url = window.URL.createObjectURL(response.data);

  window.open(url, "_blank");

};

// *********************** generate summary******************
export const generateSummary = async (
  id: string
): Promise<SummaryResponse> => {

  const response = await api.post(
    `/documents/${id}/summary`
  );

  return response.data;

};

// ///////////////////////// nottes//////////////////////////
export const generateNotes = async (
  id: string
) => {

  const response = await api.post(
    `/documents/${id}/notes`
  );

  return response.data;
};

// ====================== flashcard =====================
export const generateFlashcards = async (
  documentId: string
) => {

  const response = await api.post(
    `/documents/${documentId}/flashcards`
  );

  return response.data;

};

// generate quiz =====================================
export const generateQuiz = async (
  id: string
) => {

  const response = await api.post(
    `/documents/${id}/quiz`
  );

  return response.data;

};
