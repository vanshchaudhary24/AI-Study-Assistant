import axios from "axios";
import FormData from "form-data";
import fs from "fs";

export const extractImageText = async (
  filePath: string
) => {

  const formData = new FormData();

  formData.append(
    "file",
    fs.createReadStream(filePath)
  );

  const response = await axios.post(

    "http://127.0.0.1:8000/ocr",

    formData,

    {
      headers: formData.getHeaders(),
    }

  );

  return response.data.text;

};