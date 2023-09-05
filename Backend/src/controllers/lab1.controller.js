import csvParser from "../util/csvParser.js";
import asyncHandler from "express-async-handler";
import Person from "../models/person.js";
import operations from "../util/operation.js";
import AVLTree from "../common/avltree.js";

const tree = new AVLTree();
const operation = new operations(tree);

function processLine(record) {
  const parsedData = JSON.parse(record.json);
  const person = new Person(
    parsedData.name,
    parsedData.dpi,
    parsedData.datebirth,
    parsedData.address
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
    const path = "./src/data/input.csv";
    const records = await csvParser(path);
    for (const record of records) {
      processLine(record);
    }
    res.send("Datos cargados correctamente");
  } catch (error) {
    console.log(`Ocurrio un error ${error}`);
  }
});

const getData = asyncHandler(async (req, res) => {
  try {
    if (operation.getJSONL("./src/data/output.jsonl")) {
      res.send("Datos cargados correctamente");
    }
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
    console.log(result);
    res.send(result);
  } catch (error) {
    res.send(`No se pudo ejecutar la operacion debido a ${error}`);
  }
});

const deleteByNameDpi = asyncHandler(async (req, res) => {
  try {
    const name = req.params.name.trim();
    const dpi = req.params.dpi;
    console.log(name)
    const result = operation.deleteByNameDpi(name, dpi);
    let validation = 0;
    if (result !== null) {
      validation =1;
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

    const result = operation.searchByDpi(dpi);
    console.log(result);
    res.send(result);
  } catch (error) {
    console.log(error)
  }

});

export {
  treeCharger,
  getData,
  searchByName,
  searchByDPI,
  searchByNameDpi,
  deleteByNameDpi,
};
