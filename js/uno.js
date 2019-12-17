$(function () {
	empty_game();
    fill_game();
    $('#player1hand tr').click(giveTableValue);
    $('#player2hand tr').click(giveTableValue);
});


function empty_game() {
    document.getElementById('player1hand').innerHTML = "";
    document.getElementById('player2hand').innerHTML = "";
}

function throwCard(value) {
    console.log(value.innerText);
}

function fill_game() {
    $.ajax({url: "uno.php/game/", success: fill_game_by_data });
}

function fill_game_by_data(data) {
    var hand_one = '<tbody><tr>';
    var hand_two = '<tbody><tr>';
    for(var i = 0; i < 7; i ++) {
        hand_one += '<td onclick="giveTableValue(this)">' + data[i].cardCode + '</td>';
    }
    hand_one += '</tbody></tr>';
    for(var i = 7; i < 14; i ++) {
        hand_two += '<td onclick="giveTableValue(this)">' + data[i].cardCode + '</td>';
    }
    hand_two += '</tbody></tr>';
    document.getElementById('player1hand').innerHTML = hand_one;
    document.getElementById('player2hand').innerHTML = hand_two;
    document.getElementById('deckTable').innerHTML = '<h3>' + data[i].cardCode + '</h3>';
}