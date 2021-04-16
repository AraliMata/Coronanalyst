<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

function msg($success,$status,$message,$extra = []){
    return array_merge([
        'success' => $success,
        'status' => $status,
        'message' => $message
    ],$extra);
}

// INCLUDING DATABASE AND MAKING OBJECT
require __DIR__.'/classes/Database.php';
$db_connection = new Database();
$conn = $db_connection->dbConnection();

// GET DATA FORM REQUEST
$data = json_decode(file_get_contents("php://input"));
$returnData = [];

// IF REQUEST METHOD IS NOT POST
if($_SERVER["REQUEST_METHOD"] != "POST"):
    $returnData = msg(0,404,'Page Not Found!');

// CHECKING EMPTY FIELDS
elseif(!isset($data->genero) 
    || !isset($data->edad)
    || !isset($data->estadocivil)
    || !isset($data->estudios)
    || !isset($data->ocupacion)
    || !isset($data->ingreso_economico)
    || !isset($data->estado)
    || ($data->genero == "seleccione")
    || ($data->edad == "seleccione")
    || ($data->estadocivil == "seleccione")
    || ($data->estudios == "seleccione")
    || ($data->ocupacion == "seleccione")
    || ($data->ingreso_economico == "seleccione")
    || ($data->estado == "seleccione")
    ):

    $fields = ['fields' => ['genero','edad', 'estadocivil', 'estudios', 'ocupacion', 'ingreso_economico', 'estado']];
    $returnData = msg(0,422,'Please Fill in all Required Fields!',$fields);

// IF THERE ARE NO EMPTY FIELDS THEN-
else:
    $genero = trim($data->genero);
    $edad = trim($data->edad);
    $estadocivil = trim($data->estadocivil);
    $estudios = trim($data->estudios);
    $ocupacion = trim($data->ocupacion);
    $ingreso_economico = trim($data->ingreso_economico);
    $estado = trim($data->estado);
    $id_user = trim($data->id_user);

        try{

            $insert_query = "INSERT INTO DatosPersonales (ID_usuario, edad, ingreso_economico, estudios, estado_civil, genero, estado, ocupacion) VALUES(:id_user, :edad, :ingreso_economico, :estudios, :estadocivil, :genero, :estado, :ocupacion)";

            $insert_stmt = $conn->prepare($insert_query);

            // DATA BINDING
            $insert_stmt->bindValue(':edad', $edad,PDO::PARAM_STR);
            $insert_stmt->bindValue(':ingreso_economico', $ingreso_economico,PDO::PARAM_STR);
            $insert_stmt->bindValue(':estudios', $estudios,PDO::PARAM_STR);
            $insert_stmt->bindValue(':estadocivil', $estadocivil,PDO::PARAM_STR);
            $insert_stmt->bindValue(':genero', $genero,PDO::PARAM_STR);
            $insert_stmt->bindValue(':estado', $estado,PDO::PARAM_STR);
            $insert_stmt->bindValue(':ocupacion', $ocupacion,PDO::PARAM_STR);
            $insert_stmt->bindValue(':id_user', $id_user,PDO::PARAM_INT);
            $insert_stmt->execute();

            $returnData = msg(1,201,'You have successfully registered the data.');

        }
        catch(PDOException $e){
            $returnData = msg(0,500,$e->getMessage());
        }

    
endif;

echo json_encode($returnData);