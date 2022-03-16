var userName = "";
let number = undefined;
let goOn = "";
let acceptCard;
let randomNumber;
var usedNumbers = [];
var lastNumber = 1000;
var mess = '';
var bingoComplete = false;
var linesCounter = 0;

var card = [
  [
    [
      {number: 1, matched: false},
      {number: 2, matched: false}, 
      {number: 3, matched: false}, 
      {number: 4, matched: false}, 
      {number: 5, matched: false}
    ],
    [
      {full: false},
      {warned: false}
    ]
  ],
  [
    [
      {number: 6, matched: false},
      {number: 7, matched: false}, 
      {number: 8, matched: false}, 
      {number: 9, matched: false}, 
      {number: 10, matched: false}
    ],
    [
      {full: false},
      {warned: false}
    ]
  ],
  [
    [
      {number: 11, matched: false},
      {number: 12, matched: false}, 
      {number: 13, matched: false}, 
      {number: 14, matched: false}, 
      {number: 15, matched: false}
    ],
    [
      {full: false},
      {warned: false}
    ]
  ]
];

// function to change the matched property in the number object
const matchNumber = (randomN) => {
  for (let i=0; i < card.length ; i++){

    for(let j = 0; j < card[i].length - 1; j++){

        let full = 0;

      for (let k = 0; k < card[i][j].length; k++) {

        if(card[i][j][k].number === randomN){
          card[i][j][k].matched = true;

        } 

        if(card[i][j][k].matched === true) full++;

        if(card[i][1].full !== true &&  card[i][1].warned !== true) {
          if(full === 5) {
            card[i][1].full = true;
            card[i][1].warned = true;
            linesCounter++;
            alert(`LÍNEA !!!`);

            if (linesCounter === card.length){
              bingoComplete = true;
            }

            if (bingoComplete === true){
              alert(`**********         **********\n\n             BINGO !!!          \n\n**********         **********\n\nAhora puedes consultar en la consola tu puntuación y el ranking del Top 5`);

              alert("FIN DE LA PRIMERA VERSIÓN");

              // showScore();
              // showRanking();
              // askAgain();
            }

          }
        } 
      }
    }
  }
  // }
  return card;
}

// function to able to render the bingo card in the console.table format
const showCard = (input) => {
  let output = [];
  for (let i=0; i < input.length ; i++){
    for(let j = 0; j < input[i].length - 1; j++){
      let k = [];
        for(let l = 0; l < input[i][j].length; l++){
            if(input[i][j][l].matched === true){
              k.push("X");
            } else{
              k.push(input[i][j][l].number);
            }
        }
        output.push(k);
    }
  }
  return output;
};

// function to close the session
const cancelGame = () => {
  alert(`Has salido del juego.\nBye ${userName} !`)
}

// App's main function
const bingo = () =>{
  do {
    userName = prompt(`Bienvenido/a a Bingo Game !!
Ingresa tu nombre`);
  
  } while (userName === null || userName === "");

  // console.info(`Este es tu cartón`);
  // console.table(showCard(card));

  do {
    console.info(`Este es tu cartón`);
    console.table(showCard(card));

    acceptCard = prompt(`Revisa tu cartón en la consola.\n\nMe quedo este cartón -> Ok\nQuiero otro diferente -> Cancelar\n**En esta versión mínima el cartón siempre es el mismo`);


  } while (acceptCard === null );


  do {
    if (lastNumber !== 1000) mess = `Ha salido el número ${lastNumber}`
      
    goOn = prompt(`${mess}\n\n¿Nuevo número? -> Ok\nSalir del juego -> Cancelar`);

    

    let found = false;
    do {
      randomNumber = (Math.floor(Math.random()*15 + 1));

      lastNumber = randomNumber;

      if(usedNumbers.indexOf(randomNumber) === -1){
        usedNumbers.push(randomNumber);

        matchNumber(randomNumber);
        console.table(showCard(card));
        found = true;
      } 
      
    } while (found === false);

  } while (goOn !== null);

  cancelGame();
}

bingo();