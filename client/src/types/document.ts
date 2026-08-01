export interface Document {
  _id: string;

  fileName: string;
  originalName: string;

  fileType: string;
  fileSize: number;

  filePath: string;

  createdAt: string;
}

export interface UploadResponse {
  success: boolean;
  message: string;
  data: Document;
}

export interface DocumentsResponse {
  success: boolean;
  data: Document[];
}

export interface SummaryResponse {
  success: boolean;
  summary: string;
}