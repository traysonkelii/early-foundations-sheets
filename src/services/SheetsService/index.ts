import axios from "axios";

export const sheetsService = async (req: any, res: any, range: string) => {
  const baseUrl =
    "https://49bpwej7qa.execute-api.us-east-1.amazonaws.com/prod/api/v1/sheets";
  const queryString = range && range.length > 1 ? `?range=${range}` : "";

  return await (
    await axios.get(baseUrl + queryString)
  ).data.data;
};

export const sheetsPostService = async (body: object) => {
  const baseUrl =
    "https://49bpwej7qa.execute-api.us-east-1.amazonaws.com/prod/api/v1/sheets";

  const res = await axios.post(baseUrl, body);
  return await res.data.data;
};
