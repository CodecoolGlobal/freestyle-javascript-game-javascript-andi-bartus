initGame();


function initGame() {

    // Your game can start here, but define separate functions, don't write everything in here :)
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const player1_name = urlParams.get('player1');
    const player2_name = urlParams.get('player2');

    let player_1 = document.querySelector(".player-1 > p");
    player_1.innerHTML = player1_name

    let player_2 = document.querySelector(".player-2 > p");
    player_2.innerHTML = player2_name

    let suits = ["S", "H", "D", "C"];
    let values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    let deck = [];

    function createDeck()
    {
        deck = [];
        for (let i = 0 ; i < values.length; i++)
        {
            for(let x = 0; x < suits.length; x++)
            {
                let weight = parseInt(values[i]);
                if (values[i] === "J" || values[i] === "Q" || values[i] === "K")
                    weight = 10;
                if (values[i] === "A")
                    weight = 11;
                let card = { Value: values[i], Suit: suits[x], Weight: weight };
                deck.push(card);
            }
        }
    }
    createDeck()

    let hit_button = document.querySelector(".hit");
    hit_button.addEventListener('click', function (){
        let random_card = deck[Math.floor(Math.random() * (deck.length - 1))]
        let hand_img = document.createElement('img')
        hand_img.src = `./cards/${random_card.Value}${random_card.Suit}.png`
        document.querySelector('#p1_hand').appendChild(hand_img)
    })



}
