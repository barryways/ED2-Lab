import Person from "../models/person.js";
import { InsertData, DeleteData, PatchData } from "./operation.js";
let isFirstLine = true;

function processLine(record) {
  if (isFirstLine) {
    isFirstLine = false;
    return;
  }
  const parsedData = JSON.parse(record.json);
  let person;
  if (!parsedData.hasOwnProperty('dateBirth') && !parsedData.hasOwnProperty('address')) {
    person = new Person(
      parsedData.name,
      parsedData.dpi,
      null,
      null
    );
    console.log(person);
  }
  else if (!parsedData.hasOwnProperty('dateBirth')) {
     person = new Person(
      parsedData.name,
      parsedData.dpi,
      null,
      parsedData.address
    );
    console.log(person);
  }
  else if (!parsedData.hasOwnProperty('address')) {
    person = new Person(
      parsedData.name,
      parsedData.dpi,
      parsedData.datebirth,
      null
    );
    console.log(person);
  }



  try {
    if (command === "INSERT") {
      try {
        InsertData(person);
      } catch (error) {
        console.log(error)
      }
      
    } else if (command === "DELETE") {
      try {
        DeleteData(person);
      } catch (error) {
        console.log(error)
      }
      
    } else if (command === "PATCH") {
      try {
        PatchData(person);
      } catch (error) {
        console.log(error)
      }
      

    } else {
      console.error(`Comando desconocido: ${command}`);
    }
  } catch (error) {
    console.error(`Error en línea: ${line}`, error);
  }
}

export default processLine;
