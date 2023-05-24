import { sheetsService } from "@/services/SheetsService";

export const buildRangeBasePath = (range: string) => `/api/sheets?range=${range}`;

export default async (req: any, res: any) => {
  const { range } = req.query;
  const data = await sheetsService(req, res, range);
  res.status(200).json({ data });
};