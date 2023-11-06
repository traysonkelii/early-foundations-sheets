import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://example.com";
const FORMS_API = process.env.NEXT_PUBLIC_FORM_API || "https://example.com";
const ENV = process.env.NEXT_PUBLIC_ENV || "dev";

export const sheetsService = async (req: any, res: any, range: string) => {
  let queryString;
  let response;
  // PK's are used in DDB instead of range query
  if (ENV === "dev") {
    queryString = range && range.length > 1 ? `?range=${range}` : "";
  } else {
    queryString = range && range.length > 1 ? range.split("!")[0] : "";
  }
  response = await (await axios.get(API_URL + "/" + queryString)).data.data;

  return response;
};

export const sheetsPostService = async (body: object) => {
  const res = await axios.post(FORMS_API, body);
  return await res.data.data;
};
