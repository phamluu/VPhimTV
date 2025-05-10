import path from 'path';
import * as fs from 'node:fs';

const tempDirPath = path.resolve(__dirname, '../temp');
const historyFilePath = path.join(tempDirPath, 'history.json');

if (!fs.existsSync(tempDirPath)) {
  fs.mkdirSync(tempDirPath, { recursive: true });
}

export async function writeHistory(page: number, slugInfo: string) {
  const historyObj = {
    page,
    movieInfoSlug: slugInfo,
  };

  fs.writeFileSync(historyFilePath, JSON.stringify(historyObj));
}

export async function readHistory() {
  if (!fs.existsSync(historyFilePath)) {
    return null;
  }

  const historyData = fs.readFileSync(historyFilePath, 'utf-8');
  return JSON.parse(historyData);
}
