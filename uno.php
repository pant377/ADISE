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
                case 'play':
                        switch($b=array_shift($request)) {
                                case '':
                                        case null: handle_move($input);  
                                break;
                                case 'ch_col': change_color($input);
                                break;
                                case 'add_ch_col': handle_move_ch($input);
                                break;
                                case 'skip': handle_move_skip($input);
                                break;
                        }
                break;
                case 'player': 
                        switch ($b=array_shift($request)) {
                                case '':
                                        case null: add_player($input);
                                        break;
                                case '1':
                                        getPlayer('1');
                                        break;
                                case '2':
                                        getPlayer('2');
                                        break;
                                case 'all':
                                        getPlayers();
                        }
                break;
                case 'pass' : pass();
                case 'draw' : 
                        switch ($b=array_shift($request)) {
                                case '':
                                        case null: add_card();
                                        break;
                                case 'enemy': draw_cards_for_enemy();
                                        break;
                }
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

function pass() {
        global $mysqli;
        $sql = 'call playerTurn()';
        $st = $mysqli->prepare($sql);
        $st -> execute();
        
        $sql = 'SELECT cardCode FROM cardtable WHERE number = (SELECT MAX(number) FROM cardtable)';
	$sm = $mysqli -> prepare($sql);
	$sm -> execute();
	$rem = $sm -> get_result();
	$ren = $rem -> fetch_assoc();

	show_game($ren['cardCode']);
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

        $sql = 'SELECT * FROM players WHERE username = ?';
        $sw = $mysqli -> prepare($sql);
        $sw -> bind_param('s', $input['x']);
        $sw -> execute();
        $req = $sw -> get_result();
        header('Content-type: application/json');
	print json_encode($req->fetch_all(MYSQLI_ASSOC), JSON_PRETTY_PRINT);
}

function change_color($input) { //allagi xrwmatos kai prosthiki tou chcol sto table
        global $mysqli;

        $sql = 'call playerTurn()';
        $st = $mysqli->prepare($sql);
	$st -> execute();



        $sql = 'INSERT INTO cardTable(cardCode) VALUES(?)';
	$sw = $mysqli -> prepare($sql);
        $sw -> bind_param('s', $input['x']);
        $sw -> execute();

        $sql = 'SELECT cardCode FROM cardtable WHERE number = (SELECT MAX(number) FROM cardtable)';
	$sm = $mysqli -> prepare($sql);
	$sm -> execute();
	$rem = $sm -> get_result();
	$ren = $rem -> fetch_assoc();

	show_game($ren['cardCode']);
}

function handle_move_skip($input) { //petaw tin karta, kai den allazei i seira
        global $mysqli;
        $sql = 'call playerTurn()';
        $st = $mysqli->prepare($sql);
        $st -> execute();
        
        $sql = 'DELETE FROM hand WHERE cardId IN (SELECT h2.cardId FROM hand h2 INNER JOIN carddeck c2 ON c2.cardId = h2.cardId INNER JOIN players p on h2.playerId = p.playerId WHERE c2.cardCode = ? AND p.turn = 0) LIMIT 1';
	$sw = $mysqli -> prepare($sql);
        $sw -> bind_param('s', $input['x']);
        $sw -> execute();

        $sql = 'call playerTurn()';
        $st = $mysqli->prepare($sql);
        $st -> execute();

        $sql = 'INSERT INTO cardTable(cardCode) VALUES(?)';
	$sw = $mysqli -> prepare($sql);
        $sw -> bind_param('s', $input['x']);
        $sw -> execute();

        $sql = 'SELECT cardCode FROM cardtable WHERE number = (SELECT MAX(number) FROM cardtable)';
	$sm = $mysqli -> prepare($sql);
	$sm -> execute();
	$rem = $sm -> get_result();
	$ren = $rem -> fetch_assoc();

	show_game($ren['cardCode']);
}

function handle_move_ch($input) { //prosthiki tou pleon epilegmenou xrwmatos sto table
        global $mysqli;
        
        $sql = 'DELETE FROM hand WHERE cardId IN (SELECT h2.cardId FROM hand h2 INNER JOIN carddeck c2 ON c2.cardId = h2.cardId INNER JOIN players p on h2.playerId = p.playerId WHERE c2.cardCode = ? AND p.turn = 1) LIMIT 1';
	$sw = $mysqli -> prepare($sql);
        $sw -> bind_param('s', $input['x']);
        $sw -> execute();

        $sql = 'INSERT INTO cardTable(cardCode) VALUES(?)';
	$sw = $mysqli -> prepare($sql);
        $sw -> bind_param('s', $input['x']);
        $sw -> execute();

        $sql = 'SELECT cardCode FROM cardtable WHERE number = (SELECT MAX(number) FROM cardtable)';
	$sm = $mysqli -> prepare($sql);
	$sm -> execute();
	$rem = $sm -> get_result();
	$ren = $rem -> fetch_assoc();

	show_game($ren['cardCode']);
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

        $sql = 'INSERT INTO cardTable(cardCode) VALUES(?)';
	$sw = $mysqli -> prepare($sql);
        $sw -> bind_param('s', $input['x']);
        $sw -> execute();

        $sql = 'SELECT cardCode FROM cardtable WHERE number = (SELECT MAX(number) FROM cardtable)';
	$sm = $mysqli -> prepare($sql);
	$sm -> execute();
	$rem = $sm -> get_result();
	$ren = $rem -> fetch_assoc();

	show_game($ren['cardCode']);
}

function getPlayers() {
        global $mysqli;
        $sql = 'SELECT * FROM players';
        $sw = $mysqli -> prepare($sql);
        $sw -> execute();
        $req = $sw -> get_result();
        header('Content-type: application/json');
	print json_encode($req->fetch_all(MYSQLI_ASSOC), JSON_PRETTY_PRINT);
}

function getPlayer($pl) {
        global $mysqli;
        $sql = 'SELECT * FROM players WHERE playerId = ?';
        $sw = $mysqli -> prepare($sql);
        $sw -> bind_param('s', $pl);
        $sw -> execute();
        $req = $sw -> get_result();
        header('Content-type: application/json');
	print json_encode($req->fetch_all(MYSQLI_ASSOC), JSON_PRETTY_PRINT);
}

function handle_game($method) {
        global $mysqli;
        if($method=='GET') {
                $sql = 'SELECT cardCode FROM cardtable WHERE number = (SELECT MAX(number) FROM cardtable)';
	        $sm = $mysqli -> prepare($sql);
	        $sm -> execute();
	        $rem = $sm -> get_result();
	        $ren = $rem -> fetch_assoc();
	        show_game($ren['cardCode']);
        }
        else if ($method=='POST') {
                reset_game();
        }
}

?>