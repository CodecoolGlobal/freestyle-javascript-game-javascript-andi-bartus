initGame();


function initGame() {


    // Your game can start here, but define separate functions, don't write everything in here :)
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const player1_name = urlParams.get('player1');
    const player2_name = urlParams.get('player2');

    let player_1 = document.querySelector(".player-1-cards > p");
    player_1.innerHTML = player1_name

    let player_2 = document.querySelector(".player-2-cards > p");
    player_2.innerHTML = player2_name
    initChips()
    let suits = ["S", "H", "D", "C"];
    let values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    let deck = [];

    function createDeck() {
        deck = [];
        for (let i = 0; i < values.length; i++) {
            for (let x = 0; x < suits.length; x++) {
                let weight = parseInt(values[i]);
                if (values[i] === "J" || values[i] === "Q" || values[i] === "K")
                    weight = 10;
                if (values[i] === "A")
                    weight = 11;
                let card = {Value: values[i], Suit: suits[x], Weight: weight};
                deck.push(card);
            }
        }
    }

    createDeck()
    let hand = '#p1_hand'
    let player_score = '#p1_score > p'
    let count = 0
    let score1 = 0
    let score2 = 0


    function hit_player() {

        let hit_button = document.querySelector(".hit");
        hit_button.addEventListener('click', function test() {
            let random_card = deck[Math.floor(Math.random() * (deck.length - 1))]
            let hand_img = document.createElement('img')
            hand_img.src = `./cards/${random_card.Value}${random_card.Suit}.png`
            hand_img.classList.add("card")
            document.querySelector(hand).appendChild(hand_img)

            let score = document.querySelector(player_score)
            if (player_score === '#p2_score > p') {
                score2 += random_card.Weight
            } else if (player_score === '#p1_score > p') {
                score1 += random_card.Weight
            }
            console.log(score1)
            console.log(score2)
            count += random_card.Weight
            score.innerHTML = "Score: " + count
        })
    }

    function stay() {
        let stay = document.querySelector(".stay");
        stay.addEventListener('click', function () {
            document.querySelector(".player-1-cards").classList.remove("active")
            hand = '#p2_hand'
            player_score = '#p2_score > p'
            count = 0
            document.querySelector(".player-2-cards").classList.add("active")
        })
    }

    function win() {
        if (score1 === 21) {
            alert(player1_name + "won the game!")
        } else if (score2 === 21) {
            alert(player2_name + "won the game!")
        }
    }

    stay()
    hit_player()
    win()
}


function initChips() {
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
        ;


    })
}

