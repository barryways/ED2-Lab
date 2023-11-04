import csvParser from "../util/csvParser.js";
import asyncHandler from "express-async-handler";
import Person from "../models/person.js";
import operations from "../util/operation.js";
import AVLTree from "../common/avltree.js";
import coder from "../util/decoder.js";
import letter from "../services/letterService.js";
import Conversation from "../services/ConversationService.js";
import RSA from "../common/rsa.js";

const conversation = new Conversation();
const Letter = new letter();
const tree = new AVLTree();
const operation = new operations(tree);
const decoder = new coder();

function processLine(record) {
  const parsedData = JSON.parse(record.json);
  const person = new Person(
    parsedData.name,
    parsedData.dpi,
    parsedData.datebirth,
    parsedData.address,
    parsedData.companies,
    parsedData.recluiter
  );
  console.log(person);
  try {
    if (record.operation === "INSERT") {
      console.log("aqui llega")
      operation.InsertData(person);

      console.log("Insercion exitosa de "+person.name +" con dpi "+person.dpi);
    } else if (record.operation === "DELETE") {
      operation.DeleteData(person);
      //console.log("Llego al delete")
    } else if (record.operation === "PATCH") {
      operation.PatchData(person);
    } else {
      console.error(`Comando desconocido: ${command}`);
    }
  } catch (error) {
    console.error(`Error en línea: ${record}`, error);
  }
}

const treeCharger = asyncHandler(async (req, res) => {
  try {
    let validacion = "Arbol no cargado";
    const path = "./src/data/Lab5/input.csv";
    const records = await csvParser(path);

    for (const record of records) {
      console.log(record)
      processLine(record);
    }
    validacion = "Arbol cargado correctamente";
    res.send(validacion);
  } catch (error) {
    console.log(`Ocurrio un error ${error}`);
  }
});

const getData = asyncHandler(async (req, res) => {
  try {
    const filePath = "./src/data/output.jsonl"; // Ruta del archivo que deseas descargar

    if (operation.getJSONL(filePath)) {
      // Usar res.download() para enviar el archivo como descarga
      res.download(filePath, "archivo_datos.jsonl", (err) => {
        if (err) {
          console.error("Error al descargar el archivo: ", err);
          res.status(500).send("No se pudo descargar el archivo");
        }
      });
    } else {
      res.status(404).send("No se pudo cargar los datos");
    }
  } catch (error) {
    res.status(500).send(`No se pudo ejecutar la operación debido a ${error}`);
  }
});

const searchByName = asyncHandler(async (req, res) => {
  try {
    const name = req.params.name.toLowerCase().trim();
    let result = operation.searchByName(name);
    if (result.length === 0) {
      res.send("No se encontraron datos");
    } else {
      result = decoder.decodificadoEmpresas_nombre(result);
      res.json(result);
    }
  } catch (error) {
    res.send(`No se pudo ejecutar la operacion debido a ${error}`);
  }
});

const searchByDPI = asyncHandler(async (req, res) => {
  try {
    const dpi = req.params.dpi.trim();
    const result = operation.searchByDpi(dpi);
    const companies_decodificado = decoder.decodificadoEmpresas(result); // Almacena el resultado en una variable.
    result[4] = companies_decodificado; // Reemplaza el resultado de la posicion 4 por el resultado decodificado.
    res.json(result);
  } catch (error) {
    res.send(`No se pudo ejecutar la operación debido a ${error}`);
  }
});

const deleteByNameDpi = asyncHandler(async (req, res) => {
  try {
    const name = req.params.name.toLowerCase().trim();
    const dpi = req.params.dpi;
    console.log(name);
    const result = operation.deleteByNameDpi(name, dpi);
    let validation = 0;
    if (result !== null) {
      validation = 1;
    }
    res.send(`Se logro evaluar ${validation}`);
  } catch (error) {
    console.log(error);
  }
});

const searchByNameDpi = asyncHandler(async (req, res) => {
  try {
    const dpi = req.params.dpi.trim();
    const name = req.params.name;

    const result = operation.searchByNameDpi(dpi, name);
    const companies_decodificado = decoder.decodificadoEmpresas(result); // Almacena el resultado en una variable.
    result[4] = companies_decodificado;
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

const searchLetterByDPI = asyncHandler(async (req, res) => {
  try {
    const dpi = req.params.dpi;
    const cartasPorPersona = Letter.getLetterContent(dpi);
    Letter.saveCypherOnTxt(dpi);
    res.json({ cartasPorPersona });
  } catch (error) {
    console.log(error);
  }
});

const getSignatures = asyncHandler(async (req, res) => {
  try {
    const dpi = req.params.dpi;
    const message = operation.getConversation(dpi);
    operation.signProcess(message, dpi);
    res.json(message);
  } catch (error) {
    console.log(error);
  }
});

const getValidation = asyncHandler(async (req, res) => {
  try {
    const dpi = req.params.dpi;
    let validaciones = [];
    let texto = "";
    const message = conversation.getConversationContent(dpi);
    const messageAfterCypher = conversation.getConversationContentDecipher(dpi);
    for (const conversacion in message) {
      if (message.hasOwnProperty(conversacion)) {
        const element = message[conversacion];
        const element2 = messageAfterCypher[conversacion];
        const validation = operation.compareHashes(element, element2);
        validaciones.push(validation);
      }
    }
    for (let i = 0; i < validaciones.length; i++) {
      texto = `${texto} \n La conversacion ${i + 1} es ${validaciones[i]}`;
    }
    res.send(texto);
  } catch (error) {
    console.log(error);
  }
});

const getValidation2 = asyncHandler(async (req, res) => {
  try {
    const dpi = req.params.dpi;
    let validacionesLista = [];
    const validaciones = operation.validar2(dpi,validacionesLista);
    res.send(validaciones);
  } catch (error) {
    console.log(error);
  }
});

const rsa = asyncHandler(async (req, res) => {
  try {
    const rsa = new RSA();
    // Message
    const message = "Hello, World!";

    // Generate RSA keys
    const keys = rsa.generate(250);

    console.log("Keys");
    console.log("n:", keys.n.toString()); //clave publica
    console.log("d:", keys.d.toString()); //clave privada
    console.log("e:", keys.e.toString());

    const encoded_message = rsa.encode(message);
    const encrypted_message = rsa.encrypt(encoded_message, keys.n, keys.e);
    const decrypted_message = rsa.decrypt(encrypted_message, keys.d, keys.n);
    const decoded_message = rsa.decode(decrypted_message);

    console.log("Message:", message);
    console.log("Encoded:", encoded_message.toString());
    console.log("Encrypted:", encrypted_message.toString());
    console.log("Decrypted:", decrypted_message.toString());
    console.log("Decoded:", decoded_message.toString());
    console.log();
    console.log("Correct?", message === decoded_message);
  } catch (error) {
    console.log(error);
  }
});

export {
  treeCharger,
  getData,
  searchByName,
  searchByDPI,
  searchByNameDpi,
  deleteByNameDpi,
  searchLetterByDPI,
  getSignatures,
  getValidation,
  getValidation2,
  rsa,
};
