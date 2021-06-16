function initNames() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const player1_name = urlParams.get('player1');
    const player2_name = urlParams.get('player2');
    document.querySelector(".player-1-cards > p").innerHTML = player1_name;
    document.querySelector(".player-2-cards > p").innerHTML = player2_name;
    console.log(`${player1_name}, ${player2_name}`)
}

function initChips(){
    const bet_field = document.querySelector('.bet-field')
    const chips = document.querySelectorAll('.chips')
    let dragged_item = null
    let dragged_copy = null
    let bet_counter = 0
    for (let item of chips) {
        item.querySelectorAll('img').forEach(img => {
            img.draggable = true;
            img.addEventListener('dragstart', function (e) {
                dragged_item = e.target
                let copy = dragged_item.cloneNode(true)
                dragged_copy = copy
            })
        });


        item.addEventListener('dragend', function () {
            setTimeout(function () {
                dragged_item.style.display = 'block';
                dragged_item = null
            }, 0)
        });
    }

    bet_field.addEventListener('dragover', function (e) {
        e.preventDefault()
    });

    bet_field.addEventListener('dragenter', function (e) {
        e.preventDefault()

    });


    bet_field.addEventListener('drop', function (e) {
        e.preventDefault()
        let value = Number(dragged_item.dataset.value)
        bet_counter += value
        let bet = document.querySelector(".table > p")
        bet.innerHTML = bet_counter
        this.appendChild(dragged_copy)
        dragged_item.dataset.pc = String(Number(dragged_item.dataset.pc) - 1);
        dragged_item.nextSibling.innerHTML = String(Number(dragged_item.nextSibling.innerHTML) - 1)
        if (dragged_item.dataset.pc === "0") {
            dragged_item.draggable = false

        }
}

function createDeck() {
    let suits = ["S", "H", "D", "C"];
    let values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    let deck = [];
    for (let value of values) {
        for (let suit of suits) {
            let weight = parseInt(value);
            if (value === "J" || value === "Q" || value === "K")
                weight = 10;
            if (value === "A")
                weight = 11;
            let card = {Value: value, Suit: suit, Weight: weight};
            deck.push(card);
        }
    }
    return deck
}

function playerRound(player, deck) {
    document.querySelector(".deck").addEventListener('click', function () {
        getNewCard(player, deck)
    })
}

function getNewCard(player, deck) {
    let randomCard = deck[Math.floor(Math.random() * (deck.length - 1))];
    let newCard = document.createElement('img');
    newCard.src = `./cards/${randomCard.Value}${randomCard.Suit}.png`;
    newCard.classList.add("card");
    player.Hand.appendChild(newCard);
    let newScore = parseInt(player.Score.innerHTML) + randomCard.Weight;
    player.Score.innerHTML = `Score: ${newScore}`;
}

function dealerRound(deck) {
    alert("dealer's round!")
}

function win() {
    if (score1 === 21) {
        alert(player1_name + "won the game!")
    } else if (score2 === 21) {
        alert(player2_name + "won the game!")
    }
}

function initStay(player2, deck) {
    document.querySelector(".stay").addEventListener('click', function (e) {
        let active = document.querySelector(".active");
        if (active.classList.contains("player-1-cards")) {
            document.querySelector(".deck").removeEventListener("click", getNewCard);
            active.classList.remove("active");
            document.querySelector(".player-2-cards").classList.add("active");
            playerRound(player2, deck)
        } else if (active.classList.contains("player-2-cards")) {
            active.classList.remove("active");
            dealerRound(deck)
        }
    })
}

function initStart(player1, deck) {
    document.querySelector(".start").addEventListener("click", function (event) {
        playerRound(player1, deck)
    })
}

function initPlayers() {
    let names = [document.querySelector(".player-1-cards > p").innerHTML,
        document.querySelector(".player-2-cards > p").innerHTML]
    let players = []
    for (let i = 0; i < names.length; i++) {
        let player = {
            Name: names[i],
            Bet: 0,
            Hand: document.querySelector(`#p${i + 1}_hand`),
            Score: document.querySelector(`#p${i + 1}_score > p`)
        }
        players.push(player)
        console.log(player)
    }
    return players
}
let game = {
    player1: null,
    player2: null,
    deck: createDeck()
    initGame: () => {
        initNames()
        [game.player1, game.player2] = initPlayers()
        initChips()
        const deck = createDeck()
        initStart(player1, deck)
        initStay(player2, deck)
    }
}