<?php
require_once("models/frontend.model.php");
require_once("models/routes.model.php");
class frontendController
{
    private $model;

    public function __construct()
    {
        $this->model = new frontendModel();
    }
    public static function login()
    {
        include "views/src/modules/login.php";
    }
    public static function dashboard()
    {
        session_start(); // Iniciar la sesión
        if (!isset($_SESSION['usuario'])) {
            header("Location: login");
        }
        include "views/src/modules/dashboard.php";
    }

    public static function busqueda()
    {
        session_start(); // Iniciar la sesión
        if (!isset($_SESSION['usuario'])) {
            header("Location: login");
        }
        include "views/src/modules/busqueda.php";
    }
    private function validateCredentials($user, $pass, $company, $dpi) : bool{
        $result = $this->model->validateCredentials($user, $pass, $company, $dpi);
        if($result){
            return true;
        }
        return false;
    }
    public static function verification()
    {
        session_start(); // Iniciar la sesión
        $dpi = $_POST['dpi'];
        $company = $_POST['company'];
        $usuario = $_POST['user'];
        $clave = $_POST['password'];
        

        $controller = new frontendcontroller(); // Crear una instancia de la clase
        $isValid = $controller->validateCredentials($usuario, $clave, $company, $dpi);

        if ($isValid) {
            $_SESSION['usuario'] = $usuario;
            $_SESSION['company'] = $company;
            header("Location: dashboard");
        }
    }



    public static function logout()
    {
        session_start();
        session_destroy();
        header("Location: login");
        exit();
    }
}