var userName = "";
let number = undefined;
let goOn = "";
let acceptCard;
let randomNumber;
var usedNumbers = [];
var fullLines = [];

var card = [
  [
    {number: 1, matched: false},
    {number: 2, matched: false}, 
    {number: 3, matched: false}, 
    {number: 4, matched: false}, 
    {number: 5, matched: false}
  ],
  [
    {number: 6, matched: false},
    {number: 7, matched: false}, 
    {number: 8, matched: false}, 
    {number: 9, matched: false}, 
    {number: 10, matched: false}
  ],
  [
    {number: 11, matched: false},
    {number: 12, matched: false}, 
    {number: 13, matched: false}, 
    {number: 14, matched: false}, 
    {number: 15, matched: false}
  ],
];

const checkLines = () => {
  for (let i=0; i < card.length ; ++i){
    for(let j = 0; j < card[i].length; j++){
      if(card[i][j].matched === true){
        fullLines.push
      } 
    }
  }
  return fullLines;
}

const matchNumber = (randomN) => {
  for (let i=0; i < card.length ; ++i){
    for(let j = 0; j < card[i].length; j++){
      if(card[i][j].number === randomN){
        card[i][j].matched = true;
      } 
    }
  }
  return card;
}

const showCard = (input) => {
  let output = [];
  for (let i=0; i < input.length ; ++i){
  let k = [];

    for(let j = 0; j < input[i].length; j++){
      if(input[i][j].matched === true){
        k.push("X");
      } else{
        k.push(input[i][j].number);
      }
    }
    output.push(k);
  }
  return output;
};

const cancelGame = () => {
  console.log(`Has salido del juego.\nBye ${userName} !`)
}


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

    acceptCard = prompt(`Me quedo este cartón -> Ok\nQuiero otro diferente -> Cancelar`);


  } while (acceptCard === null );


  do {
    goOn = prompt(`¿Nuevo Número? -> Ok\nSalir del juego -> Cancelar`);

    let found = false;
    do {
      randomNumber = (Math.floor(Math.random()*15 + 1));

      console.log(randomNumber);
      if(usedNumbers.indexOf(randomNumber) === -1){
        usedNumbers.push(randomNumber);
        console.log(usedNumbers);

        matchNumber(randomNumber);
        console.table(showCard(card));
        found = true;
        goOn = "";
      } 
      
    } while (found === false);

  } while (goOn !== null);

  cancelGame();
}

bingo();