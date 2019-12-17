<?php
$newV;
function show_game() {
	global $mysqli;
	$sql = 'SELECT * FROM carddeck ORDER BY RAND()';
	$st = $mysqli->prepare($sql);
	$st->execute();
	$res = $st->get_result();
	header('Content-type: application/json');
	$newV = $res;
	print json_encode($newV->fetch_all(MYSQLI_ASSOC), JSON_PRETTY_PRINT);
}
function reset_game() {
	global $mysqli;
	$sql = 'call clean_deck()';
	$mysqli->query($sql);
	show_game();
}
?>