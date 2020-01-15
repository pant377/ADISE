var player = null;

function player_names(data) { //dinei sto html ta onomata
    if (data[1]) {
        if (player.playerId == data[0].playerId) {
            document.getElementById('playerOneName').innerHTML = data[0].username;
            document.getElementById('playerTwoName').innerHTML = data[1].username;
        } else {
            document.getElementById('playerOneName').innerHTML = data[1].username;
            document.getElementById('playerTwoName').innerHTML = data[0].username;
        }
    } else {
        document.getElementById('playerOneName').innerHTML = data[0].username;
        document.getElementById('playerTwoName').innerHTML = "Waiting for others to join...";
    }
}

function givePlayerValue(data) {
    player = data[0]; //dinei to data se mia metavliti player
    generateGame(); //to data einai mia select * from players where name = username
}

function updateInfo() { //stelnw to playerid kai pairnw ton paixti
    $.ajax({
        url: "uno.php/game/player/" + player.playerId,
        method: 'GET',
        success: updatePlayer
    });
}

function addPlayer() { //prosthiki tou player sto database
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

function updatePlayer(data) { //update to player kathe 1 second
    player = data[0];
    fill_game();
    setTimeout(function () {
        updateInfo();
    }, 1000);
}