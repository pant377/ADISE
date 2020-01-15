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
    ' <table class="table" id="player2hand"> </table> </div> </div> </div><div id="success"></div>' +
    ' <div id="colors_div"> </div>';

function resetGame() { //diagrafi twn vasewn pou den xreiazontai, kai moirasma filwn stous paixtes
    document.getElementById('success').innerHTML = '*New Game Started*<br>Try Logging In'
    $.ajax({
        type: 'POST',
        url: "uno.php/game/",
        success: fill_game_by_data
    });
}

function drawCard() { //kalei tin add_card, pou dinei ston paixth kartes
    $.ajax({
        type: 'POST',
        url: "uno.php/game/draw",
        success: fill_game_by_data
    });
}

function generateGame() { //ftiaxnei to ui, kai kanei update info
    document.getElementById('mainContainer').innerHTML = gameUI;
    updateInfo();
}

/*function empty_game() {
    document.getElementById('player1hand').innerHTML = "";
    document.getElementById('player2hand').innerHTML = "";
}*/

function throwCard(value) {
    var deck = document.getElementById('deckTable').innerText;
    console.log(deck[deck.length - 1]);
    if (value.innerText.length == 2) {
        //elegxos gia to an einai idio to gramma g = g, y = y
        //i an einai idios o arithmos, 5 = 1
        if (value.innerText[0] == deck[0] || value.innerText[1] == deck[1] ||
            value.innerText[0] == deck[deck.length - 1].toLowerCase()) {
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
    } else if (value.innerText.length == 3) {
        //to idio me panw stous elegxoys panw katw
        if (value.innerText[2] == deck[0] ||
            value.innerText[2] == deck[deck.length - 1].toLowerCase()) {
            $.ajax({
                type: 'POST',
                url: "uno.php/game/draw/enemy",
                success: fill_game_by_data
            });
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
    } else if (value.innerText.length == 4) {
        //analoga me to an einai skip i to rev kanw analoga pragmata
        if (value.innerText[3].toLowerCase() == deck[0] ||
            value.innerText[3].toLowerCase() == deck[deck.length - 1].toLowerCase()) {
            if (value.innerText[0] == "s") {
                $.ajax({
                    url: "uno.php/game/play/skip",
                    method: 'PUT',
                    dataType: "json",
                    contentType: 'application/json',
                    data: JSON.stringify({
                        x: value.innerText
                    }),
                    success: fill_game_by_data
                });
            } else {
                $.ajax({
                    url: "uno.php/game/play",
                    method: 'PUT',
                    dataType: "json",
                    contentType: 'application/json',
                    data: JSON.stringify({
                        x: value.innerText
                    }),
                    success: fill_game_by_data
                });
            }
        }
    } else if (value.innerText.length == 5) {
        $.ajax({
            url: "uno.php/game/play/add_ch_col",
            method: 'PUT',
            dataType: "json",
            contentType: 'application/json',
            data: JSON.stringify({
                x: value.innerText
            }),
            success: fill_game_by_data
        });
        document.getElementById('colors_div').innerHTML = 'choose color: <div class="container">' +
            '<div class="row"> <div class="col col-lg-1" id="blue" onclick="color_picker(this.id)">b' +
            ' </div> <div class="col col-lg-1" id="yellow" onclick="color_picker(this.id)">y </div>' +
            ' <div class="col col-lg-1" id="red" onclick="color_picker(this.id)">r </div>' +
            ' <div class="col col-lg-1" id="green" onclick="color_picker(this.id)">g </div> ' +
            '</div> </div>';
    }
}

function color_picker(color) { //epilogi xrwmatos an patithei to koumpi allazei to xrwma
    //kai stelnetai stin vasi gia na mpei sto table
    var color;
    switch (color) {
        case "red":
            color = "r_";
            break;
        case "blue":
            color = "b_";
            break;
        case "yellow":
            color = "y_";
            break;
        case "green":
            color = "g_";
            break;
        default:
            break;
    }
    $.ajax({
        url: "uno.php/game/play/ch_col",
        method: 'PUT',
        dataType: "json",
        contentType: 'application/json',
        data: JSON.stringify({
            x: color
        }),
        success: fill_game_by_data
    });
    document.getElementById('colors_div').innerHTML = "";
}

function pass() { //den stelnw tipota, ara den diagrafetai tipota
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