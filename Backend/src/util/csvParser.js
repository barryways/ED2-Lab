import fs from "fs";

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
        let 
        records.push(line);
      }
    });
    return records;
  } catch (error) {
    console.log(`Error al operar en el archivo ${error}`);
    return false;
  }
}
