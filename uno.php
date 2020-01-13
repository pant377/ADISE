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
                case 'player': add_player($input);
                break;
                case 'draw' : add_card();
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
        default: header("HTTP/1.1 404 Not Found");
        exit;
}

function add_player($input) {
        global $mysqli;
        $sql = 'SELECT COUNT(*) AS num FROM players';
        $sw = $mysqli -> prepare($sql);
        $sw -> execute();
        $req = $sw -> get_result();
        $res = $req -> fetch_assoc(); 
        if($res['num'] == 0 || $res['num'] >= 2) {
                $sql = 'DELETE FROM players';
                $sw = $mysqli -> prepare($sql);
                $sw -> execute();
                $sql = 'INSERT INTO players(playerId, username, turn) VALUES (1, ?, 1)';
        }else {
                $sql = 'INSERT INTO players(playerId, username) VALUES (2, ?)';
        }
        $sw = $mysqli -> prepare($sql);
        $sw -> bind_param('s', $input['x']);
        $sw -> execute();
}

function handle_move($input) {
        global $mysqli;
        $sql = 'call playerTurn()';
        $st = $mysqli->prepare($sql);
	$st -> execute();
	$sql = 'DELETE FROM hand WHERE cardId IN (SELECT h2.cardId FROM hand h2 INNER JOIN carddeck c2 ON c2.cardId = h2.cardId INNER JOIN players p on h2.playerId = p.playerId WHERE c2.cardCode = ? AND p.turn = 0) LIMIT 1';
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