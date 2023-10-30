<body>
    <?php include_once('header.php'); ?>

    <div class="container text-center">
        <div>
            <h1 class="display-3">Panel de Control</h1>
            <p class="roboto">Bienvenido al panel de control de Talent Hub estimado
                <?php echo $_SESSION['usuario'] ?>
            </p>
        </div>
        <div>
            <p>Presiona aca para importar todos los datos del input al arbol AVL</p>
            <button id="importar" class="btn btn-primary">Importar Datos</button>
        </div>
        <div>
            <h2>Búsqueda</h2>
            <input type="text" id="busquedaInput" placeholder="Ingresa el término de búsqueda">
            <button id="buscarDPI" class="btn btn-primary" disabled>Buscar por DPI</button>
            <button id="buscarNombre" class="btn btn-primary" disabled>Buscar por Nombre</button>
            <button id="buscarNombreDPI" class="btn btn-primary" disabled>Buscar por Nombre y DPI</button>
        </div>
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
    <?php include_once('footer.php'); ?>
</body>