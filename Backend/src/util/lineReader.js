import Person from "../models/person.js";
import { InsertData, DeleteData, PatchData } from "./operation.js";

function processLine(line) {
  const [command, jsonData] = line.split(";");
  const parsedData = JSON.parse(jsonData);
  const person = new Person(
    parsedData.name,
    parsedData.dpi,
    parsedData.datebirth,
    parsedData.address
  );

  try {
    if (command === "INSERT") {
      InsertData(person);
    } else if (command === "DELETE") {
      DeleteData(person);
    } else if (command === "PATCH") {
      PatchData(person);
    } else {
      console.error(`Comando desconocido: ${command}`);
    }
  } catch (error) {
    console.error(`Error en línea: ${line}`, error);
  }
}

export default processLine;
