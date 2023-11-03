import express from "express";
const router = express.Router();
import {treeCharger,
    getData,
    searchByDPI, 
    searchByName,
    searchByNameDpi, 
    deleteByNameDpi, 
    searchLetterByDPI,
    getSignatures,
    getValidation,
    getValidation2,
    rsa
 } from "../controllers/lab1.controller.js";


router.route('/import/').get(treeCharger);
//localhost:4000/api/lab1/import/
router.route('/getData/').get(getData);
//localhost:4000/api/lab1/getData/
router.route('/signatures/:dpi').get(getSignatures);
//localhost:4000/api/lab1/signatures/:dpi
router.route('/validate2/:dpi').get(getValidation2);
router.route('/validate/:dpi').get(getValidation);
//localhost:4000/api/lab1/signatures/:dpi
router.route('/searchByName/:name').get(searchByName);
//localhost:4000/api/lab1/searchByName/:name
router.route('/searchByDPI/:dpi').get(searchByDPI);
//localhost:4000/api/lab1/searchByDPI/:dpi
router.route('/searchByNameDPI/:name/:dpi').get(searchByNameDpi);
//localhost:4000/api/lab1/searchByName/:name
router.route('/deleteByNameDPI/:name/:dpi').get(deleteByNameDpi);
//localhost:4000/api/lab1/searchByDPI/:dpi
router.route('/getLetter/:dpi').get(searchLetterByDPI);
//localhost:4000/api/lab1/getLetter/:dpi
router.route('/rsa/').get(rsa);


export default router;