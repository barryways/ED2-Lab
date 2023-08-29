import express from "express";
const router = express.Router();
import csvParser from "../util/csvParser.js";
import {treeCharger,getData,searchByDPI, searchByName } from "../controllers/lab1.controller.js";


router.route('/importacion/').get(treeCharger);
//localhost:4000/api/lab1/importacion/
router.route('/pruebaDato/').get(getData);
//localhost:4000/api/lab1/pruebaDato/
router.route('/searchByName/:name').get(searchByName);
//localhost:4000/api/lab1/searchByName/:name
router.route('/searchByDPI/:dpi').get(searchByDPI);
//localhost:4000/api/lab1/searchByDPI/:dpi


export default router;