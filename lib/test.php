<?php
    $mysqli = mysqli_connect("localhost", "root", "", "uno");
	$sql = 'SELECT * FROM carddeck ORDER BY RAND()';
	$st = $mysqli->prepare($sql);
	$st->execute();
	$res = $st->get_result();
	header('Content-type: application/json');
	print json_encode(array($res->fetch_all(MYSQLI_ASSOC)), JSON_PRETTY_PRINT);
?>
