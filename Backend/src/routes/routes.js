import express from "express";
const router = express.Router();
import csvParser from "../util/csvParser.js";
import {treeCharger,getData,searchByDPI, searchByName,searchByNameDpi, deleteByNameDpi, pruebaLZ78 } from "../controllers/lab1.controller.js";


router.route('/importacion/').get(treeCharger);
//localhost:4000/api/lab1/importacion/
router.route('/getData/').get(getData);
//localhost:4000/api/lab1/pruebaDato/
router.route('/searchByName/:name').get(searchByName);
//localhost:4000/api/lab1/searchByName/:name
router.route('/searchByDPI/:dpi').get(searchByDPI);
//localhost:4000/api/lab1/searchByDPI/:dpi
router.route('/searchByNameDPI/:name/:dpi').get(searchByNameDpi);
//localhost:4000/api/lab1/searchByName/:name
router.route('/deleteByNameDPI/:name/:dpi').get(deleteByNameDpi);
//localhost:4000/api/lab1/searchByDPI/:dpi
router.route('/LZ/').get(pruebaLZ78);



export default router;