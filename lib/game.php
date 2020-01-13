<?php
function show_status() {
	global $mysqli;
	$sql = 'SELECT * FROM carddeck ORDER BY RAND() LIMIT BY 15';
	$st = $mysqli->prepare($sql);
	$st->execute();
	$res = $st->get_result();
	header('Content-type: application/json');
	print json_encode(array($res->fetch_all(MYSQLI_ASSOC)), JSON_PRETTY_PRINT);
}
?>