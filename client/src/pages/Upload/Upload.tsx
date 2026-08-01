import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


import UploadHeader from "../../components/upload/UploadHeader";
import FileDropzone from "../../components/upload/FileDropzone";
import SelectedFiles from "../../components/upload/SelectedFiles";
import UploadButton from "../../components/upload/UploadButton";
import UploadStatCard from "../../components/upload/UploadStatCard";
import { uploadDocument } from "../../services/document.service";

import {
  FileText,
  HardDrive,
  UploadCloud,
} from "lucide-react";

const Upload = () => {
  const [files, setFiles] = useState<File[]>([]);

  const [uploading , setUploading] = 
     useState(false);

  const navigate = useNavigate();   

  const addFiles = (newFiles: File[]) => {
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const totalSize = files
    .reduce((acc, file) => acc + file.size, 0);

    const handleUpload = async () => {

  if (files.length === 0)
    return;

  try {

    setUploading(true);

    for (const file of files) {

      await uploadDocument(file);

    }

    toast.success(
      "Documents uploaded successfully."
    );

    setFiles([]);

    setTimeout(() => {
      navigate("/documents");
    }, 700);

  } catch (error: any) {

    toast.error(
      error?.response?.data?.message ||
      "Upload failed."
    );

  } finally {

    setUploading(false);

  }

};

  return (
    <>

      <UploadHeader />

      <div className="mb-10 grid gap-6 md:grid-cols-3">

        <UploadStatCard
          title="Selected Files"
          value={files.length.toString()}
          icon={<FileText />}
        />

        <UploadStatCard
          title="Total Size"
          value={`${(totalSize / 1024 / 1024).toFixed(2)} MB`}
          icon={<HardDrive />}
        />

        <UploadStatCard
          title="Ready To Upload"
          value={files.length > 0 ? "Yes" : "No"}
          icon={<UploadCloud />}
        />

      </div>

      <FileDropzone
        onFilesAdded={addFiles}
      />

      <SelectedFiles
        files={files}
        removeFile={removeFile}
      />

      <UploadButton
        disabled={files.length === 0}
        loading={uploading}
        onClick={handleUpload}
      />


    </>
  );
};

export default Upload;