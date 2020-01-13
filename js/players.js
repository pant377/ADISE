var player = null;

function player_names(data) {
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
    player = data[0];
    generateGame();
}

function updateInfo() {
    $.ajax({
        url: "uno.php/game/player/" + player.playerId,
        method: 'GET',
        success: updatePlayer
    });
}

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

function updatePlayer(data) {
    player = data[0];
    fill_game();
    setTimeout(function () {
        updateInfo();
    }, 1000);
}