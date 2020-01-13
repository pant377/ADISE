<?php

function show_game($tt) {
	global $mysqli;
	$sql = 'SELECT cardCode, playerId FROM hand INNER JOIN carddeck WHERE hand.cardid = carddeck.cardid';
	$st = $mysqli -> prepare($sql);
	$st -> execute();
	$res = $st -> get_result();
	$sql = 'SELECT turn AS tr FROM players WHERE playerid = 1';
	$sw = $mysqli -> prepare($sql);
	$req = $sw -> execute();
	$req = $sw -> get_result();
	$rew = $req -> fetch_assoc();
	header('Content-type: application/json');
	print json_encode(array($res->fetch_all(MYSQLI_ASSOC), $tt, $rew['tr']), JSON_PRETTY_PRINT);
}


function reset_game() {
	global $mysqli;
	$sql = 'call beginGame()';
	$st = $mysqli->prepare($sql);
	$st -> execute();
	$sql = 'SELECT cardId, cardCode FROM clonedeck ORDER BY RAND() LIMIT 1';
	$sq = $mysqli -> prepare($sql);
	$sq -> execute();
	$req = $sq -> get_result();
	$row = $req -> fetch_assoc();
	$sql = 'DELETE FROM clonedeck WHERE cardId = ?';
	$sw = $mysqli -> prepare($sql);
	$sw -> bind_param('i', $row['cardId']);  
	$sw -> execute();
	show_game($row['cardCode']);
}