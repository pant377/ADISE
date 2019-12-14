<?php

function show_game() {
	global $mysqli;
	$sql = 'SELECT * FROM carddeck ORDER BY RAND()';
	$st = $mysqli->query($sql);
	$res = $st -> fetch_assoc(MYSQLI_ASSOC);
	header('Content-type: application/json');
	print json_encode($res->fetch_all(MYSQLI_ASSOC), JSON_PRETTY_PRINT);
}
function reset_game() {
	global $mysqli;
	$sql = 'call clean_deck()';
	$mysqli->query($sql);
	show_game();
}
?>