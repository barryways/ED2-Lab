<body>

    <div class="contenedor-imagen d-flex justify-content-center align-items-center">
        <div class="container">
            <div class="bg-light p-5 b-radius">

                <div class="text-center ">
                    <h1 class="text-center text-dark roboto">Talent Hub <br>Login</h1>
                    <form action="verification" method="POST" class="form">
                    <div class="form-group mb-3">
                            <label for="dpi" class="form-label text-dark">DPI</label>
                            <input type="number" name="dpi" id="dpi" class="form-control" placeholder="DPI">
                        </div>
                        <div class="form-group mb-3">
                            <label for="company" class="form-label text-dark">Compañia</label>
                            <input type="text" name="company" id="company" class="form-control" placeholder="Compañia">
                        </div>
                        <div class="form-group mb-3">
                            <label for="user" class="form-label text-dark">Usuario</label>
                            <input type="text" name="user" id="user" class="form-control" placeholder="Usuario">
                        </div>
                        <div class="form-group mb-3">
                            <label for="password" class="form-label text-dark">Password</label>
                            <input type="password" name="password" id="password" class="form-control"
                                placeholder="Contraseña">
                        </div>
                        <div class="form-group mb-3">
                            <input type="submit" class="btn btn-primary">
                        </div>
                    </form>
                </div>

            </div>
        </div>

    </div>

</body>