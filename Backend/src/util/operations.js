import Person from "../models/person";
import AVLTree, { AVLTree } from "../common/avltree";
const AVLTree = new AVLTree();

function InsertData(person){
    AVLTree.insertNode(person);
}

function DeleteData(person){
    return true;
}

function PatchData(person){
    return true;
}


function processLine(line){
    const [command, jsonData] = line.split(";");
    const parsedData = JSON.parse(jsonData);
    const person = new Person(parsedData.name, parsedData.dpi, parsedData.birthdate, parsedData.adress);

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