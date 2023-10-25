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
        // Verifica si el usuario ha iniciado sesión
        if (!isset($_SESSION['usuario'])) {
            header("Location: login");
            exit(); // Agregar esta línea para detener la ejecución después de la redirección
        }
        
        // Si el usuario ha iniciado sesión, simplemente muestra la página de dashboard sin redirección
        include "views/src/modules/dashboard.php";
    }
    public static function verification()
    {
        $usuario = $_POST['user'];
        $clave = $_POST['password'];
        if ($usuario == "admin" && $clave == "admin") {      
            session_start();  
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