<body>
    <?php include_once('header.php'); ?>

    <main class="container-fluid text-center d-grid justify-content-center align-items-center mb-5">
        <div class="row row-cols-2">
            <div class="col-md-6 importacion">
                <div>
                    <h1 class="display-3">Panel de Control</h1>
                    <p class="roboto">Bienvenido al panel de control de Talent Hub estimado
                        <?php echo $_SESSION['usuario'] ?>
                    </p>
                </div>
                <div>
                    <p>Presiona aca para obtener todos los datos del input al arbol AVL</p>
                    <button id="importar" class="btn btn-primary mb-5">Descargar Datos</button>
                </div>
            </div>
            <div class="col-md-6 text-center">
                <h2 class="display-3 text-center mb-5">Búsqueda</h2>
                <div>
                    <label for="busquedaInput" class="form-label"></label>
                    <input type="text" id="busquedaInput" placeholder="Ingresa el DPI" class="form-control mb-4">
                </div>
                <div>
                    <label for="busquedaInputName" class="form-label"></label>
                    <input type="text" id="busquedaInputName" placeholder="Ingresa el nombre" class="form-control mb-4">
                </div>

                <div class="mb-5">
                    <div class="container">
                        <button id="buscarDPI" class="btn btn-primary" disabled>Buscar por DPI</button>
                        <button id="buscarNombre" class="btn btn-primary" disabled>Buscar por Nombre</button>
                        <button id="buscarNombreDPI" class="btn btn-primary" disabled>Buscar por Nombre y DPI</button>
                    </div>
                </div>

            </div>
        </div>




        <div>

            <table id="resultadoTabla" class="table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>DPI</th>
                        <th>Fecha Nacimiento</th>
                        <th>Direccion</th>
                        <th>Compañias</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>

    </main>
    <?php include_once('footer.php'); ?>
</body>