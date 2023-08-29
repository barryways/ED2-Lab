import fs from "fs";
import csvRecords from './csvRecords.js'

export default function csvParser(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        console.error('Error al leer el archivo:', err);
        reject(err);
        return;
      }
      const records = [];
      const lines = data.trim().split('\n');
      for (const line of lines) {
        const [command, jsonData] = line.split(';');
        const record = new csvRecords(command, jsonData);
        records.push(record);
      }
      resolve(records);
    });
  });
}
