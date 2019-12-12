<html>

<head>
    <!--bootstrap-->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
        integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
        integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous">
    </script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
        integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous">
    </script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
        integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous">
    </script>
    <!--montserrat font-->
    <link href="https://fonts.googleapis.com/css?family=Montserrat&display=swap" rel="stylesheet">
    <!--my css-->
    <link rel="stylesheet" href="./css/style.css">
    <!--my javascript-->
    <script type="text/javascript" src="./js/app.js"></script>
</head>

<body>
    <div class="container" id="mainContainer">
        <div class="row">
            <div class="col">
            </div>
            <div class="col">
                <h1>UNO GAME</h1>
            </div>
            <div class="col"></div>
        </div>
        <div class="row" id="game">
            <div class="col" id="playerOne">
                Cards of player #1
                <table class="table">
                    <tbody style="border: 1px;">
                        <tr>
                            <?php include './php/giveCards.php'?>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="col" id="centerDiv">
                <button type="button" class="btn btn-secondary" onclick="startRound()">Start Game</button>
            </div>
            <div class="col" id="playerTwo">
                Cards of player #2
                <table class="table">
                    <tbody>
                        <tr>
                            <?php include './php/giveCards.php'?>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</body>

</html>