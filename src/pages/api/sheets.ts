import { sheetsPostService, sheetsService } from "@/services/SheetsService";

export const buildRangeBasePath = (range: string) =>
  `/api/sheets?range=${range}`;

export const buildBasePath = () => `/api/sheets`;

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: any, res: any) => {
  if (req.method === "POST") {
    const body = req.body ?? {};
    const data = await sheetsPostService(body);
    res.status(200).json({ data });
  } else if (req.method === "GET") {
    const { range } = req.query ?? "";
    const data = await sheetsService(req, res, range);
    res.status(200).json({ data });
  } else {
    throw new Error("HTTP Method not implemented.");
  }
};
