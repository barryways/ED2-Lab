import csvParser from "../util/csvParser.js";
import asyncHandler from "express-async-handler";
import { PreOrder } from "../util/operation.js";

const treeCharger = asyncHandler(async (req, res) => {
  try {
    const path = "./src/data/input.csv";
    const records = csvParser(path);
    for (let record of records) {
      console.log(record);
    }
    res.send(records);
  } catch (error) {
    console.log(`Ocurrio un error ${error}`);
  }
});

export default treeCharger;
