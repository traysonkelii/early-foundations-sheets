import axios from 'axios';

export const sheetsService = async (req: any, res: any, range: string) => {

  const baseUrl = 'https://49bpwej7qa.execute-api.us-east-1.amazonaws.com/prod/api/v1/sheets';
  const queryString = `?range=${range}`;

  return await (await axios.get(baseUrl + queryString)).data.data;
};
