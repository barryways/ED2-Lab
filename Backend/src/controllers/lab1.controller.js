import csvParser from "../util/csvParser.js";
import asyncHandler from "express-async-handler";
import Person from "../models/person.js";
import operations from "../util/operation.js";
import AVLTree from "../common/avltree.js";
import coder from "../util/decoder.js";
import lz78 from "../common/lz78.js";
const LZ78 = new lz78();

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
    parsedData.companies
  );

  try {
    if (record.operation === "INSERT") {
      operation.InsertData(person);
    } else if (record.operation === "DELETE") {
      operation.DeleteData(person);
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
    const path = "./src/data/input(1).csv";
    const records = await csvParser(path);

    for (const record of records) {
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
    let validacion = "";
    if (operation.getJSONL("./src/data/output.jsonl")) {
      validacion = "Datos cargados correctamente en el archivo jsonl";
    } else {
      validacion = "No se pudo cargar los datos";
    }
    res.send(validacion);
  } catch (error) {
    res.send(`No se pudo ejecutar la operacion debido a ${error}`);
  }
});

const searchByName = asyncHandler(async (req, res) => {
  try {
    const name = req.params.name.toLowerCase().trim();
    const result = operation.searchByName(name);
    if (result.length === 0) {
      res.send("No se encontraron datos");
    } else {
      res.send(result);
    }
  } catch (error) {
    res.send(`No se pudo ejecutar la operacion debido a ${error}`);
  }
});

const searchByDPI = asyncHandler(async (req, res) => {
  try {
    const dpi = req.params.dpi.trim();
    const result = operation.searchByDpi(dpi);
    const textoCodificado = decoder.texto_codificacion(result); // Almacena el resultado en una variable.
    res.send(`la persona es ${result[0]} \n con el numero de DPI ${result[1]} \n la fecha ${result[2]} \n y la direccion ${result[3]}\n${textoCodificado}`);
  } catch (error) {
    res.send(`No se pudo ejecutar la operación debido a ${error}`);
  }
});


const deleteByNameDpi = asyncHandler(async (req, res) => {
  try {
    const name = req.params.name.trim();
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
    console.log(result);
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

const pruebaLZ78 = asyncHandler(async (req, res) => {
  try {
    console.log(LZ78.decompress(LZ78.compress("8930953498984_Turner_LLC")));
    console.log(LZ78.decompress(LZ78.compress("8930953498984_Mante_-_Lesch")));
    console.log(LZ78.decompress(LZ78.compress("8930953498984_Schuster,_Olson_and_Doyle")));
    console.log(LZ78.decompress(LZ78.compress("8930953498984_Emard_LLC")));
    console.log(LZ78.decompress(LZ78.compress("8930953498984_Block_and_Sons")));
    res.send("Ok Lets go");
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
  pruebaLZ78,
};
