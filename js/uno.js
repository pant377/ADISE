$(function () {
	empty_game();
	fill_game();
});


function empty_game() {
    document.getElementById('player1hand').innerHTML = "";
    document.getElementById('player2hand').innerHTML = "";
}

function fill_game() {
	$.ajax({url: "uno.php/game/", success: fill_game_by_data });
}

function fill_game_by_data(data) {
    var hand_one = '<tbody><tr>';
    var hand_two = '<tbody><tr>';
    for(var i = 0; i < 7; i ++) {
        hand_one += '<td>' + data[i] + '</td>'
    }
    hand_one += '</tbody></tr>';
    for(var i = 7; i < 14; i ++) {
        hand_two += '<td>' + data[i] + '</td>'
    }
    hand_two += '</tbody></tr>';
    document.getElementById('player1hand').innerHTML = hand_one;
    document.getElementById('player2hand').innerHTML = hand_two;
}