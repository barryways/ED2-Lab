<?php
require 'vendor/autoload.php';
use GuzzleHttp\Client;
class frontendModel
{
    private $api = "";
    public function __construct()
    {
        $this->api = 'http://localhost:4000/api/lab1/';
    }
    
    public  function validateCredentials($user, $pass, $company, $dpi){
        try {
            $url = $this->api . 'login/'.$user.'/'.$pass.'/'.$company. '/' . $dpi;
            $client = new Client();
            $response = $client->get($url);
            
            $status = $response->getStatusCode();
            
            if ($status === 200) {
                $json = json_decode($response->getBody());
                echo "". $json->success ."". $json->message ;
                return true;
            } else {
                
                return false;
            }
        
        } catch (\Throwable $th) {
            
            return false;
        }
    }
}