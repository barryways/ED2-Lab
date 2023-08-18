import express from 'express';
import cors from 'cors';
import lab1Routes from './src/routes/routes.js'
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());

app.use('/api/lab1', lab1Routes);

app.listen(PORT, ()=>{
    console.log(`El servidor esta escuchando en el puerto ${PORT}`);
});


//localhost:4000/api/lab1/