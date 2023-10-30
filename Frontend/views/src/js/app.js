document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("importar");
  button.addEventListener("click", function () {
    fetch("http://localhost:4000/api/lab1/import", {
      method: "GET",
    })
      .then((response) => response.text())
      .then((data) => {
        // Muestra una SweetAlert con un botón para descargar el archivo
        Swal.fire({
          title: "Datos importados",
          text: data,
          showCancelButton: true,
          confirmButtonText: "Descargar Archivo",
        }).then((result) => {
          if (result.isConfirmed) {
            // Realiza una solicitud GET para descargar el archivo
            fetch("http://localhost:4000/api/lab1/getData", {
              method: "GET",
            })
              .then((response) => response.text())
              .then((downloadData) => {
                // Crear un enlace invisible y simular un clic para descargar el archivo
                const blob = new Blob([downloadData], {
                  type: "application/octet-stream",
                });
                const url = window.URL.createObjectURL(blob);

                const a = document.createElement("a");
                a.style.display = "none";
                a.href = url;
                a.download = "datos.jsonl"; // Nombre del archivo a descargar
                document.body.appendChild(a);
                a.click();

                // Liberar el objeto URL
                window.URL.revokeObjectURL(url);
              })
              .catch((error) => {
                console.error("Error al descargar el archivo: ", error);
                Swal.fire("Error", "No se pudo descargar el archivo", "error");
              });
          }
        });
      })
      .catch((error) => {
        console.error("Error al importar los datos: ", error);
        Swal.fire(
          "Error",
          "Ha ocurrido un error al importar los datos",
          "error"
        );
      });
  });

  const buttonImportar = document.getElementById("importar");
  const buttonBuscarDPI = document.getElementById("buscarDPI");
  const buttonBuscarNombre = document.getElementById("buscarNombre");
  const buttonBuscarNombreDPI = document.getElementById("buscarNombreDPI");
  const busquedaInput = document.getElementById("busquedaInput");
  const resultadoTabla = document
    .getElementById("resultadoTabla")
    .getElementsByTagName("tbody")[0];

  // Habilita los botones de búsqueda al presionar "Importar"
  buttonImportar.addEventListener("click", function () {
    buttonBuscarDPI.removeAttribute("disabled");
    buttonBuscarNombre.removeAttribute("disabled");
    buttonBuscarNombreDPI.removeAttribute("disabled");
  });

  // Función para llenar la tabla con resultados
  function llenarTabla(resultados) {
    resultadoTabla.innerHTML = ""; // Limpiar la tabla

    resultados.forEach((resultado) => {
      const fila = resultadoTabla.insertRow();
      
      const celdaNombre = fila.insertCell(0);
      const celdaDPI = fila.insertCell(1);
      const celdaDateBirth = fila.insertCell(2);
      const celdaAddress = fila.insertCell(3);
      const celdaCompanies = fila.insertCell(4);

      celdaNombre.textContent = resultado[0];
      celdaDPI.textContent = resultado[1];
      celdaDateBirth.textContent = resultado[2];
      celdaAddress.textContent = resultado[3];
      celdaCompanies.textContent = resultado[4];

      console.log(resultado);
    });
  }

  // Manejador de evento para la búsqueda por DPI
  buttonBuscarDPI.addEventListener("click", function () {
    const busqueda = busquedaInput.value;
    if (busqueda) {
      fetch(`http://localhost:4000/api/lab1/searchByDPI/${busqueda}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          // Verifica si los datos son un array y contienen al menos 5 elementos
          if (Array.isArray(data) && data.length >= 5) {
            const resultado = data; // Renombrar la variable para mayor claridad
  
            // Llena la tabla con los resultados
            const fila = resultadoTabla.insertRow();
            const celdaNombre = fila.insertCell(0);
            const celdaDPI = fila.insertCell(1);
            const celdaDateBirth = fila.insertCell(2);
            const celdaAddress = fila.insertCell(3);
            const celdaCompanies = fila.insertCell(4);
  
            celdaNombre.textContent = resultado[0];
            celdaDPI.textContent = resultado[1];
            celdaDateBirth.textContent = resultado[2];
            celdaAddress.textContent = resultado[3];
            celdaCompanies.textContent = resultado[4];
          } else {
            console.error("Los datos de la API no tienen el formato esperado.");
          }
        })
        .catch((error) => {
          console.error("Error en la búsqueda por DPI: ", error);
        });
    }
  });
  

  // Manejador de evento para la búsqueda por Nombre
  buttonBuscarNombre.addEventListener("click", function () {
    const busqueda = busquedaInput.value;
  
    if (busqueda) {
      fetch(`http://localhost:4000/api/lab1/searchByName/${busqueda}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          // Verifica si los datos son un array y contienen al menos 5 elementos
          if (Array.isArray(data) && data.length >= 5) {
            // Iteramos sobre los datos y llenamos una fila por dato
            for (const resultado of data) {
              const fila = resultado.insertRow();
  
              // Iteramos sobre las propiedades del resultado y creamos una celda por propiedad
              for (const propiedad in resultado) {
                const celda = fila.insertCell();
                celda.textContent = resultado[propiedad];
              }
            }
          } else {
            console.error("Los datos de la API no tienen el formato esperado.");
          }
        })
        .catch((error) => {
          console.error("Error en la búsqueda por DPI: ", error);
        });
    }
  });
  
  

  // Manejador de evento para la búsqueda por Nombre y DPI
  buttonBuscarNombreDPI.addEventListener("click", function () {
    const busqueda = busquedaInput.value;
    if (busqueda) {
      // Realiza una solicitud GET a la ruta correspondiente (reemplaza con la ruta correcta)
      fetch(`http://localhost:4000/api/lab1/searchByNameDPI/${busqueda}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          llenarTabla(data); // Llena la tabla con los resultados
        })
        .catch((error) => {
          console.error("Error en la búsqueda por Nombre y DPI: ", error);
        });
    }
  });
});

