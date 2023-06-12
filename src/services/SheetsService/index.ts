import axios from "axios";

const API_URL = process.env.API_URL || 'https://example.com';

export const sheetsService = async (req: any, res: any, range: string) => {
  const queryString = range && range.length > 1 ? `?range=${range}` : "";

  return await (
    await axios.get(API_URL + queryString)
  ).data.data;
};

export const sheetsPostService = async (body: object) => {

  const res = await axios.post(API_URL, body);
  return await res.data.data;
};
