import csvParser from "../util/csvParser.js";
import asyncHandler from "express-async-handler";
import { PreOrder } from "../util/operation.js";


const treeCharger = asyncHandler(async (req, res) => {
  try {
    const path = "./src/data/input.csv";
    if(csvParser(path)){
        const records = csvParser(path);
        for (const record of records) {
          
        }

    }
    else{
      console.log('Error al cargar el archivo')
    }
    res.send('Arbol cargado')
  } catch (error) {
    console.log(`Ocurrio un error ${error}`);
  }
});


export default treeCharger;