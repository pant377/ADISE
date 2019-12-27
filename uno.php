<?php require_once "lib/dbconnect.php";
require_once "lib/board.php";
require_once "lib/game.php";
$method=$_SERVER['REQUEST_METHOD'];
$request=explode('/', trim($_SERVER['PATH_INFO'], '/'));
$input=json_decode(file_get_contents('php://input'), true);

switch ($r=array_shift($request)) {
        case 'game' : switch ($b=array_shift($request)) {
                case '':
                        case null: handle_game($method);
                break;
                case 'play': handle_move($input);
                break;
                default: header("HTTP/1.1 404 Not Found");
                break;
        }

        break;

        case 'status': if(sizeof($request)==0) {
                show_status();
        }

        else {
                header("HTTP/1.1 404 Not Found");
        }

        break;
        case 'players': echo ("hija");
        break;
        default: header("HTTP/1.1 404 Not Found");
        exit;
}

function handle_move($input) {
        global $mysqli;
	$sql = 'DELETE FROM hand WHERE cardId IN (SELECT h2.cardId FROM hand h2 INNER JOIN carddeck c2 ON c2.cardId = h2.cardId WHERE c2.cardCode =?)';
	$sw = $mysqli -> prepare($sql);
        $sw -> bind_param('s', $input['x']);
        $sw -> execute();
        show_game($input['x']);
}

function handle_game($method) {

        if($method=='GET') {
                show_game('');
        }

        else if ($method=='POST') {
                reset_game();
        }
}

?>