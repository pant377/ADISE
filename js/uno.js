$(function () {
	empty_game();
    fill_game();
});


function empty_game() {
    document.getElementById('player1hand').innerHTML = "";
    document.getElementById('player2hand').innerHTML = "";
}

function throwCard(value) {
    console.log(value.innerText);
    $.ajax({url: "uno.php/game/play/", 
			method: 'PUT',
			dataType: "json",
			contentType: 'application/json',
			data: JSON.stringify({x: value.innerText}),
			success: fill_game_by_data});
}

function fill_game() {
    $.ajax({type:'POST', url: "uno.php/game/", success: fill_game_by_data });
}

function fill_game_by_data(data) {
    var hand_one = '<tbody><tr>';
    var hand_two = '<tbody><tr>';
    for(var i = 0; i < data[0].length; i ++) {
        if(data[0][i].playerId == 1){
            hand_one += '<td onclick="throwCard(this)">' + data[0][i].cardCode + '</td>';
        }
        else if(data[0][i].playerId == 2){
            hand_two += '<td onclick="throwCard(this)">' + data[0][i].cardCode + '</td>';
        }
    }
    hand_one += '</tbody></tr>';
    hand_two += '</tbody></tr>';
    document.getElementById('player1hand').innerHTML = hand_one;
    document.getElementById('player2hand').innerHTML = hand_two;
    document.getElementById('deckTable').innerHTML = '<h3>' + data[1] + '</h3>';
}