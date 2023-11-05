import express from 'express';
import cors from 'cors';
import lab1Routes from './src/routes/routes.js'
import csvParser from "./src/util/csvParser.js";
import { processLine } from "./src/controllers/lab1.controller.js";

const app = express();
const PORT = process.env.PORT || 4000; 

app.use(cors()); //Adding the cors for accesing on diferents domains (for frontend)
app.use('/api/lab1', lab1Routes); //Route: localhost:4000/api/lab1/ [for laboratory #1 (use it for add more laboratories on diferent domain routes) ] 


async function treeCharger(){    
    try {
    const path = "./src/data/Lab5/input.csv";
    const records = await csvParser(path);

    for (const record of records) {
      processLine(record);
    }
    console.log("Arbol cargado con exito");
  } catch (error) {
    console.log(`Ocurrio un error ${error}`);
  }
};


app.listen(PORT, ()=>{
    console.log(`El servidor esta escuchando en el puerto ${PORT}`);
    treeCharger();
});



//nextui -> buscar para frontend