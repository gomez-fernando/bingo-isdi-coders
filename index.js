var userName = "";
let number = undefined;
let goOn = false;
let acceptCard =  false;
let randomNumber;
var usedNumbers = [];
var lastNumber = 1000;
var mess = '';
var bingoComplete = false;
var linesCounter = 0;
var gotIt = false;
var sing = 0;
var complete = false;
var again = true;
let initialScore = 100;
// let turns = 0;
// let score;

var card = [
  [
    [
      {number, matched: false},
      {number, matched: false}, 
      {number, matched: false}, 
      {number, matched: false}, 
      {number, matched: false}
    ],
    [
      {full: false},
      {warned: false}
    ]
  ],
  [
    [
      {number, matched: false},
      {number, matched: false}, 
      {number, matched: false}, 
      {number, matched: false}, 
      {number, matched: false}
    ],
    [
      {full: false},
      {warned: false}
    ]
  ],
  [
    [
      {number, matched: false},
      {number, matched: false}, 
      {number, matched: false}, 
      {number, matched: false}, 
      {number, matched: false}
    ],
    [
      {full: false},
      {warned: false}
    ]
  ]
];

var players = [
  {name, turns: 0, score: initialScore},
  {name: "Alex", turns: 40, score: initialScore},
  {name: "Elena", turns: 48, score: initialScore},
  {name: "Mario", turns: 60, score: initialScore},
  {name: "Nines", turns: 38, score: initialScore},
];

const generateCard = () => {
  let numbers = [];
  let lNumber;
  let rNumber;

  let output = [];
  for (let i=0; i < card.length ; i++){
    for(let j = 0; j < card[i].length - 1; j++){
      let k = [];
        for(let l = 0; l < card[i][j].length; l++){
            
          let set = false;
          do {
            rNumber = (Math.floor(Math.random()*20 + 1));
        
            lNumber = rNumber;
        
            if(numbers.indexOf(lNumber) === -1){
              numbers.push(lNumber);
        
              card[i][j][l].number = lNumber;
              set = true;
            }
            
          } while (set === false);
        }
        output.push(k);
    }
  }

  // todo ajustar los números gnerados para que llegue a 99 y las lineas del carton a 5
}

// function to change the matched property in the number object
const matchNumber = (randomN) => {
  // to register the turns used by the player
  players[0].turns++;
  
  let gotIt = false;
  for (let i=0; i < card.length ; i++){

    for(let j = 0; j < card[i].length - 1; j++){

        let full = 0;

      for (let k = 0; k < card[i][j].length; k++) {

        if(card[i][j][k].number === randomN){
          card[i][j][k].matched = true;
          gotIt = true;
        }

        // todo mejorar esto
        if(card[i][j][k].matched === true) full++;

        if(card[i][1].full !== true &&  card[i][1].warned !== true) {
          if(full === 5) {
            card[i][1].full = true;
            card[i][1].warned = true;
            linesCounter++;
            sing = i + 1;

            if (linesCounter === card.length){
              // mejorar esto
              bingoComplete = true;
            }

            if (bingoComplete === true){
              console.table(showCard(card));

              alert(`**********         **********\n\n             BINGO !!!          \n\n**********         **********\n\nAhora puedes consultar en la consola tu puntuación y el ranking del Top 5`);

// todo ...
              showScore();
              // showRanking();
              askAgain();

              // skip = true;
            }
          }
        } 
      }
    }
  }
  
    if(!complete){
      console.table(showCard(card));
    if(sing !== 0) alert(`Ha salido el ${lastNumber}\n\n !!! LÍNEA ${sing} COMPLETA !!!`);
    }
  return gotIt;
}

// function to able to render the bingo card in the console.table format
const showCard = (card) => {
  let output = [];
  for (let i=0; i < card.length ; i++){
    for(let j = 0; j < card[i].length - 1; j++){
      let k = [];
        for(let l = 0; l < card[i][j].length; l++){
            if(card[i][j][l].matched === true){
              k.push("X");
            } else{
              k.push(card[i][j][l].number);
            }
        }
        output.push(k);
    }
  }
  return output;
};

// function to close the session
const cancelGame = () => {
  alert(`Has salido del juego.\nBye ${userName} !`);
}

// function to exit or restart the game
const askAgain = () => {
  // reset all variables
  number = undefined;
  goOn = "";
  acceptCard = false;
  randomNumber;
  usedNumbers = [];
  lastNumber = 1000;
  mess = '';
  bingoComplete = false;
  linesCounter = 0;
  gotIt = false;
  sing = 0;
  complete = false;
  players[0].turns = 0;

  // reset the matched property in numbers
  for (let i=0; i < card.length ; i++){
    for(let j = 0; j < card[i].length - 1; j++){
        for(let l = 0; l < card[i][j].length; l++){
          card[i][j][l].matched = false;
        }
    }
  }

  (window.confirm(`¿Quieres jugar otra vez? ----> Ok\n¿Salir del juego? ----> Cancel`))
          ? ask = true
          : ask = false;

  if (ask) {
    again = true;
    bingo();

  } else{
    again = false;
    bingo();
  }
  
}

const showScore = () => {
  for(let i = 0; i < players.length; i++){
    players[i].score = initialScore - players[i].turns;
    console.log(players[i].score );
    console.log(players[i] );
  }
}

// App's main function
const bingo = () =>{

  console.log(players);
  
  if(again){

    // again = false;

    if(userName === ""){
      do {
        userName = prompt(`Bienvenido/a a Bingo Game !!\nIngresa tu nombre`);
        players[0].name = userName;
      
      } while (userName === null || userName === "");
    }
  
    if(!complete){
      do {
        alert("Generando cartón ----> click Ok");
        generateCard();

        console.info(`Este es tu cartón`);
        console.table(showCard(card));

        (window.confirm(`Revisa tu cartón en la consola.\n\nMe quedo este cartón -> Ok\nQuiero otro diferente -> Cancelar`))
          ? acceptCard = true
          : acceptCard = false;
    
      } while (acceptCard === false );
    
      do {
        let mess2 = (gotIt === true) ? 'Sí :-)' : 'No :-(';
        if (lastNumber !== 1000 && sing === 0) mess = `Ha salido el número ${lastNumber}\n¿Lo tengo?   ${mess2}`;
    
        gotIt = false;
    
        (window.confirm(`${mess}\n\n¿Nuevo número? -> Ok\nSalir del juego -> Cancelar`))
        ? goOn = true
        : goOn = false;
    
        sing = 0;
        
    
        let found = false;
        do {
          randomNumber = (Math.floor(Math.random()*20 + 1));
    
          lastNumber = randomNumber;
    
          if(usedNumbers.indexOf(randomNumber) === -1){
            usedNumbers.push(randomNumber);
    
            gotIt = matchNumber(randomNumber);
            // console.table(showCard(card));
            found = true;
          }
          
        } while (found === false);
    
      } while (goOn && again === true);
    
      cancelGame();
    }
  } 
  // else{
  //   alert(`FIN DEL PROGRAMA`);
  //   // throw alert(`FIN DEL PROGRAMA`);
  // }
  
}

bingo();