import express from "express";
const router = express.Router();
import {
    insert,
    deleteData,
    patch,
    read
} from '../services/controller.js'

router.route('/insert/:name/:lastName/:dpi/:dir/').get(insert);
router.route('/delete/:name/:lastName/:dpi/:dir/').get(deleteData);
router.route('/patch/:name/:lastName/:dpi/:dir/').get(patch);
router.route('/read/:name/:lastName/:dpi/:dir/').get(read);
//router.route('/readdata/').get(readData);

export default router;