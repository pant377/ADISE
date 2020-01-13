var gameUI = '<div class="container" id="mainContainer"> <div class="row">' +
    '<div class="col"> </div> <div class="col" style="text-align: center;">' +
    ' <h1>UNO GAME</h1> </div> <div class="col"></div> </div> <div class="row"' +
    ' id="game" style="text-align: center;"> <div class="col" id="playerOne"> ' +
    'Cards of player #1 <br> <table class="table" id="player1hand"> </table> ' +
    '<button type="button" class="btn btn-success">Uno</button> <button type="button"' +
    ' class="btn btn-danger">Pass</button> </div> <div class="col"> <div id="deckTable">' +
    '</div> <br> <button id="drawCardsButton" type="button" class="btn-lg btn-warning">Draw' +
    '</button> </div> <div class="col" id="playerTwo"> Cards of player #2 <br> <table ' +
    'class="table" id="player2hand"> </table> <button type="button" class="btn ' +
    'btn-success">Uno</button> <button type="button" class="btn btn-danger">Pass</button>' +
    ' </div> </div> </div>';
var counter = 0;

function addPlayer() {
    var username = document.getElementById('usrnm');
    if (username.value != '') {
        counter ++;
        $.ajax({
            url: "uno.php/game/player/",
            method: 'PUT',
            dataType: "json",
            contentType: 'application/json',
            data: JSON.stringify({
                x: username.value
            })
        });
        generateGame();
    }
}

function generateGame() {
    document.getElementById('mainContainer').innerHTML = gameUI;
    empty_game();
    fill_game();
}

function empty_game() {
    document.getElementById('player1hand').innerHTML = "";
    document.getElementById('player2hand').innerHTML = "";
}

function throwCard(value) {
    $.ajax({
        url: "uno.php/game/play/",
        method: 'PUT',
        dataType: "json",
        contentType: 'application/json',
        data: JSON.stringify({
            x: value.innerText
        }),
        success: fill_game_by_data
    });
}

function fill_game() {
    $.ajax({
        type: 'POST',
        url: "uno.php/game/",
        success: fill_game_by_data
    });
}

function fill_game_by_data(data) {
    var hand_one = '<tbody><tr>';
    var hand_two = '<tbody><tr>';
    for (var i = 0; i < data[0].length; i++) {
        if (data[0][i].playerId == 1) {
            hand_one += '<td onclick="throwCard(this)">' + data[0][i].cardCode + '</td>';
        } else if (data[0][i].playerId == 2) {
            hand_two += '<td onclick="throwCard(this)">' + data[0][i].cardCode + '</td>';
        }
    }
    hand_one += '</tbody></tr>';
    hand_two += '</tbody></tr>';
    document.getElementById('player1hand').innerHTML = hand_one;
    document.getElementById('player2hand').innerHTML = hand_two;
    document.getElementById('deckTable').innerHTML = '<h3>' + data[1] + '</h3>';
}