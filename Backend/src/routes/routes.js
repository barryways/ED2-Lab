import express from "express";
const router = express.Router();
import {
    insert,
    deleteData,
    patch,
    search,
    read,
    getData, 
    contadorData,
    dataRepetida
} from '../services/controller.js'
import csvParser from "../util/csvParser.js";
import insertDato from "../services/controller.lab1.js";

//import readData from "../models/model.js";

router.route('/insert/:name/:lastName/:dpi/:dir/').get(insert);
//localhost:4000/api/lab1/insert/:name/:lastName/:dpi/:dir/
router.route('/delete/:name/:lastName/:dpi/:dir/').get(deleteData);
//localhost:4000/api/lab1/delete/:name/:lastName/:dpi/:dir/
router.route('/patch/:name/:lastName/:dpi/:dir/').get(patch);
//localhost:4000/api/lab1/patch/:name/:lastName/:dpi/:dir/
router.route('/read/').get(read);
//localhost:4000/api/lab1/read/
router.route('/search/:dpi/').get(search)
//localhost:4000/api/lab1/search/:dpi
router.route('/getdata/').get(getData)
//localhost:4000/api/lab1/getdata/
router.route('/datatotal/').get(contadorData)
//localhost:4000/api/lab1/getdata/
router.route('/repetidos/').get(dataRepetida)
//localhost:4000/api/lab1/getdata/
router.route('/avl/').get(csvParser);
//localhost:4000/api/lab1/getdata/
router.route('/pruebaDato/').get(insertDato);
//localhost:4000/api/lab1/getdata/



export default router;