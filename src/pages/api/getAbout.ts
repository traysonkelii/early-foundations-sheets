import axios from 'axios';

export default async (req: any, res: any) => {

  const baseUrl = process.env.BASE_SHEETS_API_URL;
  const queryString = 'range=about!A1:E6';

  const sheetsResponse = await (await axios.get(baseUrl + queryString)).data;
  res.status(200).json({ data: sheetsResponse.data });
};
