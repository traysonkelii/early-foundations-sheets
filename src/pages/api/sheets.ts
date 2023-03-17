import { sheetsService } from "@/services/SheetsService";

export default async (req: any, res: any) => {
  const { range } = req.query;
  const data = await sheetsService(req, res, range);
  res.status(200).json({ data });
};

export const buildRangeBasePath = (range: string) => `/api/sheets?range=${range}`;
