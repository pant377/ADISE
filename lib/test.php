<?php
	$mysqli = mysqli_connect("localhost", "root", "", "uno");	
	$sql = 'INSERT INTO hand (playerId, cardId) VALUES (1, 3)';
	$st = $mysqli->prepare($sql);
	$st->execute();
?>
