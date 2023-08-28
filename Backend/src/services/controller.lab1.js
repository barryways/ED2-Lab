import { InsertData, DeleteData, PatchData, PreOrder } from "../util/operation.js";
import Person from "../models/person.js";
import asyncHandler from "express-async-handler";

const insertDato = asyncHandler(async (req, res) => {
    const persona = new Person('Carlos','12345612','12/08/2002', 'gt')
    const persona2 = new Person('Daniel','12345699','12/08/2002', 'gt')
    const persona3 = new Person('Barrientos','12345655','12/08/2002', 'gt')
    const persona4 = new Person('Castillo','12345658','12/08/2002', 'gt')
    const persona5 = new Person('Carlos','12345624','12/08/2002', 'gt')
    const persona6 = new Person('Castillo','12345658','07/12/2003', 'mx')
    // const person = ['Carlos','12345612','12/08/2002', 'gt'];
    // const person2 = ['Daniel','12345699','12/08/2002', 'gt'];
    // const person3 = ['Barrientos','12345655','12/08/2002', 'gt'];
    // const person4 = ['Castillo','12345658','12/08/2002', 'gt'];
    // const person5 = ['Carlos','12345624','12/08/2002', 'gt'];
    try {
        InsertData(persona);
        console.log("dato insertado");
        InsertData(persona2);
        console.log("dato insertado");
        InsertData(persona3);
        console.log("dato insertado");
        InsertData(persona4);
        console.log("dato insertado");
        InsertData(persona5);
        console.log("dato insertado");
        //PatchData(persona4);
        PreOrder();
        PatchData(persona6);
        console.log('Dato Patcheado')
        PreOrder();
    } catch (error) {
      console.log(`Ocurrio un error ${error}`)
    }
})


export default insertDato;