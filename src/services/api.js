import axios from "axios";

const BASE_URL = "https://api.unsplash.com/search/photos";
const ACCESS_KEY = "Q9W1Fvj2BfcGDCicCWFdBO7BIblmPcFwTjj_J-axvwo";

export const fetchImages = async (query, page = 1) => {
  const response = await axios.get(BASE_URL, {
    params: {
      query,
      page,
      per_page: 12,
      client_id: ACCESS_KEY,
    },
  });

  return response.data;
};