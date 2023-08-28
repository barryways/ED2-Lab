import express from "express";
const router = express.Router();
import csvParser from "../util/csvParser.js";
import treeCharger from "../services/controller.lab1.js";

//localhost:4000/api/lab1/getdata/
router.route('/avl/').get(csvParser);
//localhost:4000/api/lab1/avl/
router.route('/importacion/').get(treeCharger);
//localhost:4000/api/lab1/pruebaDato/


export default router;