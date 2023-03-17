import axios from 'axios';

export default async (req: any, res: any) => {

  const baseUrl = 'https://49bpwej7qa.execute-api.us-east-1.amazonaws.com/prod/api/v1/sheets?';
  const queryString = 'range=our-schools!A1:Z60';

  const sheetsResponse = await (await axios.get(baseUrl + queryString)).data;
  res.status(200).json({ data: sheetsResponse.data });
};
