<?php

function show_game($ttable) { //SELECT tou hand, kai tou paixti me id 1 kai ta gurname sgia emfanisi
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
	print json_encode(array($res->fetch_all(MYSQLI_ASSOC), $ttable, $rew['tr']), JSON_PRETTY_PRINT);
}


function reset_game() { //reset game ara diagrafw ta panta ola apo to beginGame()
	global $mysqli; //kai epilegw 1 xarti gia to table
	
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
	
	$sql = 'INSERT INTO cardTable(cardCode) VALUES(?)';
	$sm = $mysqli -> prepare($sql);
	$sm -> bind_param('s', $row['cardCode']);
	$sm -> execute();

	show_game($row['cardCode']);
}

function draw_cards_for_enemy() { //+2X gia ton antipalo 
	global $mysqli;
	
	$sql = 'SELECT cardId AS ci FROM clonedeck ORDER BY RAND() LIMIT 1';
	$sq = $mysqli -> prepare($sql);
	$sq -> execute();
	$req = $sq -> get_result();
	$row = $req -> fetch_assoc();

	$sql = 'SELECT playerId AS pi FROM players WHERE turn = 1';
	$sw = $mysqli -> prepare($sql);
	$sw -> execute();
	$rew = $sw -> get_result();
	$res = $rew -> fetch_assoc();
	
	if($res['pi'] == 2) {
		$sql = 'INSERT INTO hand(playerId, cardId) VALUES (1, ?)';
	} else {
		$sql = 'INSERT INTO hand(playerId, cardId) VALUES (2, ?)';
	}

	$sx = $mysqli -> prepare($sql);
	$sx -> bind_param('i', $row['ci']);
	$sx -> execute();

	$sql = 'SELECT cardId AS ci FROM clonedeck ORDER BY RAND() LIMIT 1';
	$sq = $mysqli -> prepare($sql);
	$sq -> execute();
	$req = $sq -> get_result();
	$row = $req -> fetch_assoc();

	if($res['pi'] == 2) {
		$sql = 'INSERT INTO hand(playerId, cardId) VALUES (1, ?)';
	} else {
		$sql = 'INSERT INTO hand(playerId, cardId) VALUES (2, ?)';
	}

	$sx = $mysqli -> prepare($sql);
	$sx -> bind_param('i', $row['ci']);
	$sx -> execute();

	$sql = 'SELECT cardCode FROM cardtable WHERE number = (SELECT MAX(number) FROM cardtable)';
	$sm = $mysqli -> prepare($sql);
	$sm -> execute();
	$rem = $sm -> get_result();
	$ren = $rem -> fetch_assoc();

	show_game($ren['cardCode']);
}

function add_card() { //pairnw epipleon kartes an thelw
	global $mysqli;
	
	$sql = 'SELECT cardId AS ci FROM clonedeck ORDER BY RAND() LIMIT 1';
	$sq = $mysqli -> prepare($sql);
	$sq -> execute();
	$req = $sq -> get_result();
	$row = $req -> fetch_assoc();

	$sql = 'SELECT playerId AS pi FROM players WHERE turn = 1';
	$sw = $mysqli -> prepare($sql);
	$sw -> execute();
	$rew = $sw -> get_result();
	$res = $rew -> fetch_assoc();
	
	if($res['pi'] == 1) {
		$sql = 'INSERT INTO hand(playerId, cardId) VALUES (1, ?)';
	} else {
		$sql = 'INSERT INTO hand(playerId, cardId) VALUES (2, ?)';
	}

	$sx = $mysqli -> prepare($sql);
	$sx -> bind_param('i', $row['ci']);
	$sx -> execute();

	$sql = 'SELECT cardCode FROM cardtable WHERE number = (SELECT MAX(number) FROM cardtable)';
	$sm = $mysqli -> prepare($sql);
	$sm -> execute();
	$rem = $sm -> get_result();
	$ren = $rem -> fetch_assoc();

	show_game($ren['cardCode']);
}