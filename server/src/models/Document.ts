import mongoose, { Document, Schema } from "mongoose";

export interface IDocument extends Document {
  fileName: string;
  originalName: string;
  fileType: string;
  fileSize: number;
  filePath: string;
  text: string;
  
  summary?: string;
  quiz?: any[];
  notes?: string;
  flashcards?: any[];
  
  uploadedBy: mongoose.Types.ObjectId;

  createdAt: Date;
  updatedAt: Date;
}

const DocumentSchema = new Schema<IDocument>(
  {
    fileName: {
      type: String,
      required: true,
    },

    originalName: {
      type: String,
      required: true,
    },

    fileType: {
      type: String,
      required: true,
    },

    fileSize: {
      type: Number,
      required: true,
    },

    filePath: {
      type: String,
      required: true,
    },

    text: {
      type: String,
      required: true,
    },

    summary: {
      type: String,
      default: "",
    },

    quiz: {
      type: Array,
      default: [],
    },

    notes: {
      type: String,
      default: "",

    },

    flashcards: {
      type: Array,
      default: [],
    },

    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IDocument>(
  "Document",
  DocumentSchema
);