var gameUI = '<div class="container" id="mainContainer"> <div class="row">' +
    '<div class="col"> </div> <div class="col" style="text-align: center;">' +
    ' <h1>UNO GAME</h1> </div> <div class="col"></div> </div> <div class="row"' +
    ' id="game" style="text-align: center;"> <div class="col" id="playerOne"> ' +
    'Cards of player #1 <br> <table class="table" id="player1hand"> </table> ' +
    '<button type="button" class="btn btn-success">Uno</button> <button type="button"' +
    ' class="btn btn-danger">Pass</button> </div> <div class="col"> <div id="deckTable">' +
    '</div> <br> <button id="drawCardsButton" type="button" onclick="drawCard()" class="btn-lg btn-warning">Draw' +
    '</button> </div> <div class="col" id="playerTwo"> Cards of player #2 <br> <table ' +
    'class="table" id="player2hand"> </table> <button type="button" class="btn ' +
    'btn-success">Uno</button> <button type="button" class="btn btn-danger">Pass</button>' +
    ' </div> </div> </div>';
var player = null;

function addPlayer() {
    var username = document.getElementById('usrnm');
    if (username.value != '') {
        $.ajax({
            url: "uno.php/game/player/",
            method: 'PUT',
            dataType: "json",
            contentType: 'application/json',
            data: JSON.stringify({
                x: username.value
            }),
            success: givePlayerValue
        });
        
    }
}

function resetGame() {
    $.ajax({
        type: 'POST',
        url: "uno.php/game/",
        success: fill_game_by_data
    });
}

function updateInfo() {
    $.ajax({
        url: "uno.php/game/player/"+player.playerId,
        method: 'GET',
        success: updatePlayer
    });
}

function updatePlayer(data) {
    player = data[0];
    fill_game();
    setTimeout(function () {
        updateInfo();
        
    }, 4000);
}

function givePlayerValue(data) {
    player = data[0];
    console.log(player);
    generateGame();
}

function drawCard() {
    $.ajax({
        type: 'POST',
        url: "uno.php/game/draw",
        success: fill_game_by_data
    });
}

function generateGame() {
    document.getElementById('mainContainer').innerHTML = gameUI;
    updateInfo();
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
        type: 'GET',
        url: "uno.php/game/",
        success: fill_game_by_data
    });
}

function fill_game_by_data(data) {
    var hand_one = '<tbody><tr>';
    var hand_two = '<tbody><tr>';
    if (player != null) {
        if (player.turn == 1) {
            for (var i = 0; i < data[0].length; i++) {
                if (data[0][i].playerId == player.playerId) {
                    hand_one += '<td onclick="throwCard(this)" style="cursor: pointer;">' + data[0][i].cardCode + '</td>';
                } else {
                    hand_two += '<td style="cursor: context-menu;">0.0</td>';
                }
            }
        } else {
            for (var i = 0; i < data[0].length; i++) {
                if (data[0][i].playerId == player.playerId) {
                    hand_one += '<td style="cursor: context-menu;">' + data[0][i].cardCode + '</td>';
                } else {
                    hand_two += '<td style="cursor: context-menu;">0.0</td>';
                }
            }
        }
        hand_one += '</tbody></tr>';
        hand_two += '</tbody></tr>';
        document.getElementById('player1hand').innerHTML = hand_one;
        document.getElementById('player2hand').innerHTML = hand_two;
        document.getElementById('deckTable').innerHTML = '<h3>' + data[1] + '</h3>';
    }
}