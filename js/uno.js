var gameUI = '<div class="container" id="mainContainer">' +
    ' <div class="row"> <div class="col"> </div> <div class="col" style="text-align: center;">' +
    ' <h1> <b>UNO GAME</b> </h1> </div> <div class="col"></div> </div>' +
    ' <div class="row" id="game" style="text-align: center;"> <div class="col" id="playerOne">' +
    ' <div id="playerOneName"> </div> <br> <table class="table" id="player1hand">' +
    ' </table> <div id="btns" style="padding: 5px;">' +
    ' <button type="button" class="btn btn-success">Uno</button> ' +
    ' <button type="button" class="btn btn-danger" onclick="pass()" disabled>Pass</button> ' +
    ' </div> </div> <div class="col"> <div id="deckTable"> </div> <br> <div id="drawBuDiv"> </div>' +
    ' </div> <div class="col" id="playerTwo"> <div id="playerTwoName"></div> <br>' +
    ' <table class="table" id="player2hand"> </table> </div> </div> </div><div id="success"></div>';

function resetGame() {
    document.getElementById('success').innerHTML = '*New Game Started*<br>Try Logging In'
    $.ajax({
        type: 'POST',
        url: "uno.php/game/",
        success: fill_game_by_data
    });
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

function pass() {
    if (player.turn == 1)
        $.ajax({
            url: "uno.php/game/play/",
            method: 'PUT',
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
    var counter = 0;
    var counter2 = 0;
    if (player != null) {
        if (player.turn == 1) {
            for (var i = 0; i < data[0].length; i++) {
                if (data[0][i].playerId == player.playerId) {
                    counter2++;
                    hand_one += '<td onclick="throwCard(this)" style="cursor: pointer;">' + data[0][i].cardCode + '</td>';
                } else {
                    counter++;
                    hand_two += '<td style="cursor: context-menu;">' + counter + '</td>';
                }
            }
            if (counter2 == 1) {
                document.getElementById('drawBuDiv').innerHTML = '<button id="drawCardsButton" type="button" onclick="drawCard()" class="btn-lg btn-warning">Draw</button>';
                document.getElementById('btns').innerHTML = '<button type="button" class="btn btn-success">Uno</button>' +
                    '<button type="button" class="btn btn-danger" style="margin: 15px;" onclick="pass()">Pass</button>';
                document.getElementById('success').innerHTML = "You called UNO";
            } else if (counter2 == 0) {
                document.getElementById('success').innerHTML = "You Won!!";
            } else {
                document.getElementById('drawBuDiv').innerHTML = '<button id="drawCardsButton" type="button" onclick="drawCard()" class="btn-lg btn-warning">Draw</button>';
                document.getElementById('btns').innerHTML = '<button type="button" class="btn btn-success" style="margin: 15px; cursor:context-menu;" disabled>Uno</button>' +
                    '<button type="button" class="btn btn-danger" style="margin: 15px;" onclick="pass()">Pass</button>';
                document.getElementById('success').innerHTML = "";
            }
        } else {
            for (var i = 0; i < data[0].length; i++) {
                if (data[0][i].playerId == player.playerId) {
                    counter2++;
                    hand_one += '<td style="cursor: context-menu;">' + data[0][i].cardCode + '</td>';
                } else {
                    counter++;
                    hand_two += '<td style="cursor: context-menu;">' + counter + '</td>';
                }
            }
            if (counter2 == 0) {
                document.getElementById('success').innerHTML = "Enemy player called UNO";
            } else {
                document.getElementById('success').innerHTML = "";
            }
            document.getElementById('drawBuDiv').innerHTML = '<button id="drawCardsButton" type="button" class="btn-lg btn-warning" disabled>Draw</button>';
            document.getElementById('btns').innerHTML = '<button type="button" class="btn btn-success" style="cursor:context-menu;" disabled>Uno</button>' +
                '<button type="button" class="btn btn-danger" style="margin: 15px; cursor:context-menu;" disabled>Pass</button>';
        }
        hand_one += '</tbody></tr>';
        hand_two += '</tbody></tr>';
        document.getElementById('player1hand').innerHTML = hand_one;
        document.getElementById('player2hand').innerHTML = hand_two;
        document.getElementById('deckTable').innerHTML = '<h3>' + data[1] + '</h3>';
        $.ajax({
            type: 'POST',
            url: "uno.php/game/player/" + "all",
            success: player_names
        });
    }
}