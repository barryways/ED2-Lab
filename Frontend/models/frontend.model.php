<?php
use GuzzleHttp\Client;
class frontendModel
{
    private $api = "";
    public function __construct()
    {
        $this->api = 'http://localhost:4000/api/lab1/';
    }
    public  function validateCredentials($user, $pass, $company, $dpi){
        $url = $this->api . 'login/'.$user.'/'.$pass.'/'.$company. '/' . $dpi;

        $client = new Client();
        $response = $client->get($url, [
          "query" => [
            "user" => $user,
            "password" => $pass,
            "company" => $company,
            "dpi" => $dpi,
          ],
        ]);


        $status = $response->getStatusCode();
        
        if ($status === 200) {
            $json = json_decode($response->getBody());
            echo "". $json->success ."". $json->message ;
            return true;
        } else {
            // Solicitud fallida
            echo "hola";
            return false;
        }
    }
}