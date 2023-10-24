<?php
require_once(dirname(__FILE__) ."./../models/frontend.model.php");
require_once(dirname(__FILE__) ."./../models/routes.model.php");
class frontendController{
    private $model;
    
    public function __construct()
    {
        $this->model = new frontendModel();
    }
    public static function login(){
        include "modules/login.php";
    }
    public static function dashboard(){
        include "modules/dashboard.php";
    }
}