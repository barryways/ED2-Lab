import fs from "fs";
import processLine from "./lineReader.js";

export default function csvParser() {
  try {
    fs.readFile("./src/data/input.csv", "utf8", (err, data) => {
      if (err) {
        console.error("Error al leer el archivo:", err);
        return;
      }
      const lines = data.trim().split("\n");
      for (const line of lines) {
        processLine(line); //this method is in operations.js
      }
    });
    return 
  } catch (error) {
    console.log(`Error al operar en el archivo ${error}`);
  }
}
