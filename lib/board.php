<?php

function show_game() {
	$mysqli = mysqli_connect("localhost", "root", "", "uno");
	$sql = 'SELECT * FROM carddeck ORDER BY RAND()';
	$st = $mysqli->prepare($sql);
	$st->execute();
	$res = $st->get_result();
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