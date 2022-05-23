import axios from "axios";

export const baseUrl = "https://bayut.p.rapidapi.com/";

export const fetchApi = async (url) => {
  const { data } = await axios.get(url, {
    headers: {
      "x-rapidapi-host": "bayut.p.rapidapi.com",
      "x-rapidapi-key": "e737c0f79emshb263693b0a6aadap17f1eajsn952192fe4bf7",
    },
  });

  return data;
};
