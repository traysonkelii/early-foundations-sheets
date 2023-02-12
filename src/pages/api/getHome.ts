import { GoogleAuth } from 'google-auth-library';
import { google } from 'googleapis';

export default async (req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { data: any[][] | null | undefined; }): void; new(): any; }; }; }) => {
  
  const secret = process.env.secrets || '';
  const jsonSecret = JSON.parse(secret)

  const auth = new GoogleAuth({
    credentials: jsonSecret,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  const client = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: client });

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEETS_ID,
    range: 'home!A1:Z40',
  });

  const data = response.data.values;

  res.status(200).json({ data });
};
