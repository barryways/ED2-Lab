<?php
include "controllers/frontend.controller.php";
include_once 'src/modules/head.php';
    $route = null; 
    $inicio = true;
    $controller= new frontendController();
try {
    if (isset($_GET["ruta"])) { 
        $route = $_GET["ruta"];
        if ($route == "login") {
            $controller->login(); 
            $inicio = false;
        } else if ($route == "dashboard") {
            $controller->dashboard();
            $inicio = false;
        }else if ($route == "verification") {
            $controller->verification();
            $inicio = false;
        }else if($route == "logout"){
            $controller->logout();
            $inicio = false;
        }else if($route == "busqueda"){
            $controller->busqueda();
            $inicio = false;
        }
        else if($route == "prueba"){
            include "src/modules/prueba.php"; // Esto es lo que se va a mostrar en el "div" con id "contenido
            $inicio = false;
        }else {
            include "src/modules/404.php"; 
            $inicio = false;
        }

    }
    if ($inicio) {
        include "src/modules/login.php";
    }
} catch (\Throwable $th) {
    include "src/modules/login.php";
}