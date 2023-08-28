import csvParser from "../util/csvParser.js";
import asyncHandler from "express-async-handler";

const treeCharger = asyncHandler(async (req, res) => {
  try {
    csvParser();
    res.send('Arbol cargado')
  } catch (error) {
    console.log(`Ocurrio un error ${error}`);
  }
});


export default treeCharger;
