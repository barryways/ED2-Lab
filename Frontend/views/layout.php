<?php
include "controllers/frontend.controller.php";
include_once 'modules/head.php';
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
        } else if ($route == "home") {
            include "modules/404.php"; 
            $inicio = false;
        } else {

        }

    }
    if ($inicio) {
        include "modulos/welcome.php";
    }
} catch (\Throwable $th) {
    include "modulos/welcome.php";
}