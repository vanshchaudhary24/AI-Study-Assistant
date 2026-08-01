import fs from "fs/promises";

export const deleteFile = async (
  filePath: string
): Promise<void> => {
  try {
    await fs.unlink(filePath);
  } catch (error) {
   console.error("Failed to delete file:",error);
  }
};

export const fileExists = async (
  filePath: string
): Promise<boolean> => {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
};