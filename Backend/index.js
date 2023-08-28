import express from 'express';
import cors from 'cors';
import lab1Routes from './src/routes/routes.js'

const app = express();
const PORT = process.env.PORT || 4000; 

app.use(cors()); //Adding the cors for accesing on diferents domains (for frontend)
app.use('/api/lab1', lab1Routes); //Route: localhost:4000/api/lab1/ [for laboratory #1 (use it for add more laboratories on diferent domain routes) ] 

app.listen(PORT, ()=>{
    console.log(`El servidor esta escuchando en el puerto ${PORT}`);
});
