initGame();

function initGame() {

    // Your game can start here, but define separate functions, don't write everything in here :)
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    console.log(queryString)
    console.log(urlParams)
    const player1_name = urlParams.get('player1');
    const player2_name = urlParams.get('player2');

    let player_1 = document.querySelector(".player-1 > p");
    player_1.innerHTML = player1_name

    let player_2 = document.querySelector(".player-2 > p");
    player_2.innerHTML = player2_name



    }


function initChips(){
    const bet_field = document.querySelector('.bet-field')
    const players_chips = document.querySelectorAll('.chips')
    for (let chip of chips){

    }
    }
