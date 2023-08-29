import fs from "fs";
import csvRecords from './csvRecords.js'

export default function csvParser(path) {
  try {
    let records = [];
    fs.readFile(path, "utf8", (err, data) => {
      if (err) {
        console.error("Error al leer el archivo:", err);
        return;
      }
      const lines = data.trim().split("\n");
      for (const line of lines) {
        const [command, jsonData] = line.split(";");
        const record = new csvRecords(command, jsonData);
        records.push(record);
      }
    });
    return records;
  } catch (error) {
    console.log(`Error al operar en el archivo ${error}`);
    return false;
  }
}
