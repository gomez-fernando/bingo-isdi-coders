var userName = "";
let number = undefined;
let goOn = "";
let acceptCard;
let randomNumber;
var usedNumbers = [];

var card = [
  [
    [
      {number: 1, matched: false},
      {number: 2, matched: false}, 
      {number: 3, matched: false}, 
      {number: 4, matched: false}, 
      {number: 5, matched: false}
    ],
    {full: false}
  ],
  [
    [
      {number: 6, matched: false},
      {number: 7, matched: false}, 
      {number: 8, matched: false}, 
      {number: 9, matched: false}, 
      {number: 10, matched: false}
    ],
    {full: false}
  ],
  [
    [
      {number: 11, matched: false},
      {number: 12, matched: false}, 
      {number: 13, matched: false}, 
      {number: 14, matched: false}, 
      {number: 15, matched: false}
    ],
    {full: false}
  ],
];

const matchNumber = (randomN) => {
  for (let i=0; i < card.length ; i++){
    for(let j = 0; j < card[i].length - 1; j++){
      for (let k = 0; k < card[i][j].length; k++) {
        if(card[i][j][k].number === randomN){
          card[i][j][k].matched = true;
          console.log(card[i][j][k]);
          console.log(card);
        } 
      }
    }
  }
  return card;
}

const showCard = (input) => {
  let output = [];
  for (let i=0; i < input.length ; i++){

      for(let j = 0; j < input[i].length - 1; j++){
        let k = [];

        console.log(input[i][j]);

          for(let l = 0; l < input[i][j].length; l++){

              console.log(input[i][j].length);
              console.log(input[i][j][l].matched);
              if(input[i][j][l].matched === true){
                k.push("X");
                console.log("toca x");
              } else{
                k.push(input[i][j][l].number);
                console.log("toca numero");
              }
            
          }
          console.log(output);
          output.push(k);
      }
     
  }
  return output;
};

// todo ya está el presentar la card de los aciertos y tenr un array con los números ya usados.
//También hay una propiedad en el array para guardar si la línea está o no llena

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