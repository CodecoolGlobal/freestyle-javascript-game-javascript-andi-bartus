const game = {
    player1: null,
    player2: null,
    deck: null,
    initDeck: () => {
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
        game.deck = deck
    },
    initNames: () => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const player1_name = urlParams.get('player1');
        const player2_name = urlParams.get('player2');
        document.querySelector(".player-1-cards > p").innerHTML = player1_name;
        document.querySelector(".player-2-cards > p").innerHTML = player2_name;
    },
    initChips: () => {
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
                    dragged_copy = dragged_item.cloneNode(true)
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
        })
    },
    playerRound: () => {
        document.querySelector(".deck").addEventListener('click', game.getNewCard)
    },
    getNewCard: () => {
        let active = document.querySelector(".active");
        let player = undefined;
        if (active.classList.contains("player-1-cards")){
            player = game.player1;
        }
        else{
            player = game.player2
        }
        let randomCard = game.deck[Math.floor(Math.random() * (game.deck.length - 1))];
        let newCard = document.createElement('img');
        newCard.src = `./cards/${randomCard.Value}${randomCard.Suit}.png`;
        newCard.classList.add("card");
        player.Hand.appendChild(newCard);
        let newScore = player.ScoreInt + randomCard.Weight;
        player.Score.innerHTML = `Score: ${newScore.toString()}`;
        player.ScoreInt = newScore
    },
    dealerRound: () => {
        alert("dealer's round!")
    },
    win: () => {
        if (score1 === 21) {
            alert(player1_name + "won the game!")
        } else if (score2 === 21) {
            alert(player2_name + "won the game!")
        }
    },
    initStay: () =>{
        document.querySelector(".stay").addEventListener('click', function () {
            let active = document.querySelector(".active");
            if (active.classList.contains("player-1-cards")) {
                document.querySelector(".deck").removeEventListener("click", game.getNewCard);
                active.classList.remove("active");
                document.querySelector(".player-2-cards").classList.add("active");
                game.playerRound()
            } else if (active.classList.contains("player-2-cards")) {
                active.classList.remove("active");
                game.dealerRound()
            }
        })
    },
    initStart: () => {
        document.querySelector(".start").addEventListener("click", game.playerRound)
    },
    initPlayers:() => {
        let names = [document.querySelector(".player-1-cards > p").innerHTML,
            document.querySelector(".player-2-cards > p").innerHTML]
        for (let i = 0; i < names.length; i++) {
            let player = {
                Name: names[i],
                Bet: 0,
                Hand: document.querySelector(`#p${i + 1}_hand`),
                Score: document.querySelector(`#p${i + 1}_score > p`),
                ScoreInt: 0
            }
            if (i === 0){
                game.player1 = player;
            }
            else{
                game.player2 = player;
            }
            console.log(player)
        }
    },
    initGame: () => {
        game.initDeck()
        game.initNames()
        game.initPlayers()
        game.initChips()
        game.initStart()
        game.initStay()
    },
}
game.initGame()