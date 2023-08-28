import { InsertData, DeleteData, PatchData, PreOrder } from "../util/operation.js";
import Person from "../models/person.js";
import asyncHandler from "express-async-handler";

const insertDato = asyncHandler(async (req, res) => {
    //const persona1 = new Person('Carlos','12345612','12/08/2002', 'gt')
    //const persona2 = new Person('Daniel','12345699','12/08/2002', 'gt')
    //const persona3 = new Person('Barrientos','12345655','12/08/2002', 'gt')
    //const persona4 = new Person('Castillo','12345658','12/08/2002', 'gt')
    //const persona5 = new Person('Carlos','12345624','12/08/2002', 'gt')
    const person = ['Carlos','12345612','12/08/2002', 'gt'];
    const person2 = ['Daniel','12345699','12/08/2002', 'gt'];
    const person3 = ['Barrientos','12345655','12/08/2002', 'gt'];
    const person4 = ['Castillo','12345658','12/08/2002', 'gt'];
    const person5 = ['Carlos','12345624','12/08/2002', 'gt'];
    try {
        InsertData(person);
        InsertData(person2);
        InsertData(person3);
        InsertData(person4);
        InsertData(person5);
        console.log("dato insertado");
        PatchData(person4);
    } catch (error) {
      console.log(`Ocurrio un error ${error}`)
    }
})


export default insertDato;