import json from "express";
import asyncHandler from "express-async-handler";
import fs from "fs";
import BTree from "../models/three/bthree.js";

const Tree = new BTree(150);

const insert = asyncHandler(async (req, res) => {
  const name = req.params.name;
  const lastName = req.params.lastName;
  const dpi = req.params.dpi;
  const dir = req.params.dir;

  try {
    console.log(
      `Hola  desde insert este es el name ` +
        name +
        ` este es el lastname ` +
        lastName +
        ` este es el dpi ` +
        dpi +
        ` esta es la dir ` +
        dir
    );
  } catch (error) {
    return error;
  }
});

const deleteData = asyncHandler(async (req, res) => {
  const name = req.params.name;
  const lastName = req.params.lastName;
  const dpi = req.params.dpi;
  const dir = req.params.dir;

  try {
    res.send(
      `Hola  desde delete este es el name ` +
        name +
        ` este es el lastname ` +
        lastName +
        ` este es el dpi ` +
        dpi +
        ` esta es la dir ` +
        dir
    );
    console.log(
      `Hola  desde delete este es el name ` +
        name +
        ` este es el lastname ` +
        lastName +
        ` este es el dpi ` +
        dpi +
        ` esta es la dir ` +
        dir
    );
  } catch (error) {
    return error;
  }
});

const search = asyncHandler(async (req, res) => {
  const dpi = req.params.dpi;

  try {
    if(Tree.search(dpi)){
      const dataConsultada = Tree.search(dpi);
      res.send(
        `Hola, segun mis registros eres ${dataConsultada.name} con el numero de DPI ${dataConsultada.dpi}`
      );
      console.log("Si entro")
    }else{
      res.send(`No se encontraron resultados`)
      console.log("No Entro")
    }

  } catch (error) {
    console.log(`este es el error del search ${error}`);
    return error;
  }
});



const patch = asyncHandler(async (req, res) => {
  const name = req.params.name;
  const lastName = req.params.lastName;
  const dpi = req.params.dpi;
  const dir = req.params.dir;

  try {
    console.log(
      `Hola  desde patch este es el name ` +
        name +
        ` este es el lastname ` +
        lastName +
        ` este es el dpi ` +
        dpi +
        ` esta es la dir ` +
        dir
    );
  } catch (error) {
    return error;
  }
});

const processDelete = async (parsedData, Tree) => {
  try {
    if (Array.isArray(parsedData)) {
      parsedData.forEach((item) => {
        console.log(`Este es el DPI ${item.dpi}`);
        Tree.delete(item.dpi);
      });
      console.log("Eliminación exitosa 1");
    } else if (typeof parsedData === "object") {
      console.log("Parsed Data:", parsedData); // Agrega esta línea de depuración
      Tree.delete(parsedData.dpi);
      console.log(`Eliminación exitosa para DPI ${parsedData.dpi}`);
    } else {
      console.error(`Formato JSON no válido: ${JSON.stringify(parsedData)}`);
    }
  } catch (error) {
    console.error("Error en DELETE:", error);
  }
};

const processPatch = async (parsedData, Tree) => {
  try {
    if (Array.isArray(parsedData)) {
      parsedData.forEach((item) => {
        console.log(`Este es el DPI ${item.dpi}`);
      });
      console.log("Actualización parcial exitosa 1");
    } else if (typeof parsedData === "object") {
      const existingData = Tree.search(parsedData.dpi);
      if (existingData) {
        Object.assign(existingData, parsedData);
        console.log(`Actualización exitosa para DPI ${parsedData.dpi}`);
      } else {
        console.log(`No se encontró el DPI ${parsedData.dpi} para actualizar`);
      }
    } else {
      console.error(`Formato JSON no válido: ${JSON.stringify(parsedData)}`);
    }
  } catch (error) {
    console.error(`Este es el error de DELETE: ${error}
    y este es el parsed Data ${parsedData.dpi}
    `);
  }
};

const processLine = async (line, Tree) => {
  const [command, jsonData] = line.split(";");
  const parsedData = JSON.parse(jsonData);

  try {
    if (command === "INSERT") {
      if (Array.isArray(parsedData)) {
        parsedData.forEach((item) => {
          Tree.insert(item.dpi, item);
        });
        console.log("Inserción exitosa 1");
      } else if (typeof parsedData === "object") {
        Tree.insert(parsedData.dpi, parsedData);
        //console.log("Inserción exitosa 2");
      } else {
        console.error(`Formato JSON no válido: ${jsonData}`);
      }
    } else if (command === "DELETE") {
      try {
        await processDelete(parsedData, Tree);
        //console.log(`Se elimino correctamente`);
      } catch (error) {
        console.log(`Este es el error de DELETE: ${error}
        y este es el parsed Data ${parsedData}
        `);
      }
    } else if (command === "PATCH") {
      try {
        await processPatch(parsedData, Tree);
        //console.log(`Se hizo patch correctamente`);
      } catch (error) {
        console.log(`Este es el error de PATCH: ${error}
         
        `);
      }
    } else {
      console.error(`Comando desconocido: ${command}`);
    }
  } catch (error) {
    console.error(`Error en línea: ${line}`, error);
  }
};

const read = asyncHandler(async (req, res) => {
  try {
    const data = fs.readFile("./src/data/input.csv", "utf8", (err, data) => {
      if (err) {
        console.error("Error al leer el archivo:", err);
        return;
      }
    
    const lines = data.trim().split("\n");
    //const bTree = new BTree(2);

    for (const line of lines) {
      processLine(line, Tree);
    }
  });
  } catch (error) {
    console.error("Error al leer el archivo:", error);
  }
});

export { insert, deleteData, patch, search,  read };
