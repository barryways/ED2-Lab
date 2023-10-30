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
      const celdaID = fila.insertCell(0);
      const celdaNombre = fila.insertCell(1);
      const celdaDPI = fila.insertCell(2);

      celdaID.textContent = resultado.id;
      celdaNombre.textContent = resultado.nombre;
      celdaDPI.textContent = resultado.dpi;

      // Agrega más celdas según tus necesidades
    });
  }

  // Manejador de evento para la búsqueda por DPI
  buttonBuscarDPI.addEventListener("click", function () {
    const busqueda = busquedaInput.value;
    if (busqueda) {
      // Realiza una solicitud GET a la ruta correspondiente (reemplaza con la ruta correcta)
      fetch(`http://localhost:4000/api/lab1/searchByDPI/${busqueda}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          llenarTabla(data); // Llena la tabla con los resultados
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
      // Realiza una solicitud GET a la ruta correspondiente (reemplaza con la ruta correcta)
      fetch(`http://localhost:4000/api/lab1/searchByName/${busqueda}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          llenarTabla(data); // Llena la tabla con los resultados
        })
        .catch((error) => {
          console.error("Error en la búsqueda por Nombre: ", error);
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
