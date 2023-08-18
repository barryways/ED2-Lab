import fs, { read } from 'fs';

// Lee el archivo de entrada
const readData = fs.readFile('./src/data/input.csv', 'utf8', (err, data) => {
  if (err) {
    console.error('Error al leer el archivo:', err);
    return;
  }

  // Divide el contenido en líneas
  const lines = data.trim().split('\n');

  // Itera a través de las líneas
  lines.forEach(line => {
    const command = line.split(';')[0];
    const jsonData = line.split(';')[1];
    
    if (command === 'INSERT') {
      try {
        const parsedData = JSON.parse(jsonData);
        // Aquí puedes realizar acciones con los datos, como agregarlos a una base de datos
        console.log('INSERT:', parsedData);
      } catch (error) {
        console.error('Error al analizar JSON:', error);
      }
    } else if (command === 'DELETE') {
      try {
        const parsedData = JSON.parse(jsonData);
        // Aquí puedes realizar acciones de eliminación, como eliminar datos de una base de datos
        console.log('DELETE:', parsedData);
      } catch (error) {
        console.error('Error al analizar JSON:', error);
      }
    }
    else if (command === 'PATCH') {
        try {
          const parsedData = JSON.parse(jsonData);
          // Aquí puedes realizar acciones de eliminación, como eliminar datos de una base de datos
          console.log('PATCH:', parsedData);
        } catch (error) {
          console.error('Error al analizar JSON:', error);
        }
      }
  });
});

export default readData;