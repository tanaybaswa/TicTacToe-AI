let player = "X";
let comp = "O";
let game = true;
let valid = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
let squares = document.getElementsByClassName("square");
let taken = 0;

async function onClick(event){
  if (game && event.target.innerHTML === ""){
    event.target.innerHTML = player;
    taken++;
    checkWinner(player);
    await sleep(300);
    
    if(game){
      
      botspot4();
      taken++;
      checkWinner(comp);
    }
  }
}

function checkWinner(agent){

  if(taken === 9){
    document.getElementById("status").innerHTML = "Draw!";
    game = false;

  } else {
    valid.forEach((combo) => {
      if (squares[combo[0]].innerHTML === agent && squares[combo[1]].innerHTML === agent && squares[combo[2]].innerHTML === agent){
        
        document.getElementById("status").innerHTML = agent + " won!";
        game = false;
      } 
    })
  }
}

function botspot(){
    for(let i = 0; i<squares.length; i++){
        if (squares[i].innerHTML === ""){
            squares[i].innerHTML = comp;
            break;
        }
    }
}

function botspot2(){

  let i = Math.floor(Math.random()*9);

  while(squares[i].innerHTML !== ""){
    i = Math.floor(Math.random()*9);
  }

  squares[i].innerHTML = comp;

}

function botspot3(){

  let winspot = findWins();

  if(winspot !== -1){
    squares[winspot].innerHTML = comp;
  } else {
    botspot2();
  }

}

function findWins(){

  for (let i = 0; i < valid.length; i++){

    let triplet = valid[i];
    let sum = 0;
    let possible = -1;

    for (let j = 0; j < 3; j++){
      if(squares[triplet[j]].innerHTML === comp){
        sum++;
      } else if (squares[triplet[j]].innerHTML === ""){
        possible = triplet[j];
      }
    }

    if(sum === 2 && possible !== -1){
      return possible;
    }

  }

  return -1;
}

function botspot4(){

  let winspot = findWins();
  if(winspot !== -1){
    squares[winspot].innerHTML = comp;
  } else {
    let lossSpot = stopLosses();
    
    if(lossSpot !== -1){
      squares[lossSpot].innerHTML = comp;
    } else{
      botspot2();
    }
  }

}

function stopLosses(){

  for (let i = 0; i < valid.length; i++){

    let triplet = valid[i];
    let sum = 0;
    let possible = -1;

    for (let j = 0; j < 3; j++){
      if(squares[triplet[j]].innerHTML === player){
        sum++;
      } else if (squares[triplet[j]].innerHTML === ""){
        possible = triplet[j];
      }
    }

    if(sum === 2 && possible !== -1){
      return possible;
    }
  }
  return -1;
}





function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function restart(){
  for(let i = 0; i<squares.length; i++){
    squares[i].innerHTML = "";
  }
  game = true;
  document.getElementById("status").innerHTML = "Game in Progress";
  taken = 0;
}