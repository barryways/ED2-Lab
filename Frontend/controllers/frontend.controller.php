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


    public static function verification()
    {
        session_start(); // Iniciar la sesión
        $usuario = $_POST['user'];
        $clave = $_POST['password'];

        if ($usuario == "admin" && $clave == "admin") {
            $_SESSION['usuario'] = $usuario;
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