import api from "./api";

export const searchDocuments = async (
  query: string
) => {

  const response = await api.post(
    "/documents/search",
    {
      query,
    }
  );

  return response.data;

};