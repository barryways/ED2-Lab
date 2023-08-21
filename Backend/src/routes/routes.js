import express from "express";
const router = express.Router();
import {
    insert,
    deleteData,
    patch,
    search,
    read
} from '../services/controller.js'
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



export default router;