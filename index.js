// Pobranie referencji przycisku startowego

const startButton = document.getElementById('startButton');




// function wait

async function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}




// Generating text info on the screen

function logFight(text){

    const logDiv = document.getElementById('walka-log');
    const nowyLog = document.createElement('div');
    nowyLog.classList.add('log');
    nowyLog.textContent = text;
    logDiv.appendChild(nowyLog);
    logDiv.insertBefore(nowyLog, logDiv.firstChild); 
}




// Clear Player 1 and 2 Caracteristics Card

function clearPlayer1Card() {
    const Card1Log = document.getElementById('Player1Card');
    Card1Log.innerHTML = '';
}

function clearPlayer2Card() {
    const Card2Log = document.getElementById('Player2Card');
    Card2Log.innerHTML = '';
}





// Generating Player1 Card Characteristics function 
function Player1Card(txt){
const Card1Log = document.getElementById('Player1Card');


if (!Card1Log) {
    console.error('Element o id "Player1Card" nie został znaleziony.');
    return;
}


const CardLog = document.createElement('div');
CardLog.classList.add('log');
CardLog.textContent = txt;
Card1Log.appendChild(CardLog);
}

// Generating Player1 Card Characteristics 

function Player1CardDisplay(){
clearPlayer1Card();
Player1Card(`Characteristics`);
Player1Card(player1.name);
Player1Card(`HP:  ${player1.hp}`);
Player1Card(`Attack Power:  ${player1.attackPower}`);
Player1Card(`Hit Chance:  ${player1.hitChance} %`);
Player1Card(`Initiative:  ${player1.initiative}`);
Player1Card(`Armor:  ${player1.armour} (Absorb: ${player1.dmgAbsorb})`);
Player1Card(`Weapon:  ${player1.weapon} (Damage Bonus: ${player1.dmgBonus})`);
}




// Generating Player2 Card Characteristics function 
function Player2Card(txt){
    const Card2Log = document.getElementById('Player2Card');
    
    
    if (!Card2Log) {
        console.error('Element o id "Player2Card" nie został znaleziony.');
        return;
    }
    
    
    const CardLog = document.createElement('div');
    CardLog.classList.add('log');
    CardLog.textContent = txt;
    Card2Log.appendChild(CardLog);
    }
    
    // Generating Player2 Card Characteristics 
    
    function Player2CardDisplay(){
    clearPlayer2Card();
    Player2Card(`Characteristics`);
    Player2Card(player2.name);
    Player2Card(`HP:  ${player2.hp}`);
    Player2Card(`Attack Power:  ${player2.attackPower}`);
    Player2Card(`Hit Chance:  ${player2.hitChance} %`);
    Player2Card(`Initiative:  ${player2.initiative}`);
    Player2Card(`Armor:  ${player2.armour} (Absorb: ${player2.dmgAbsorb})`);
    Player2Card(`Weapon:  ${player2.weapon} (Damage Bonus: ${player2.dmgBonus})`);
    }
    

function refreshPlayerCards(){

Player1CardDisplay();
Player2CardDisplay();


}

// Dice

function getRandomInt(min,max){

    return Math.floor(Math.random() * (max - min + 1)) + min;

}


//Tablice z ekwipunkiem
const armors = ["leather armor", "chainmail", "plate armor"];
const weapons = ["wooden club",  "axe", "two handed sword"];


// Class Player

class Player {

constructor(name){
this.name = name;
this.hp = getRandomInt(20,40);
this.hitChance = getRandomInt(25,60);
this.attackPower = getRandomInt(5,20);
this.initiative = getRandomInt(2,10);
this.armour = armors[getRandomInt(0,armors.length - 1)];
this.dmgAbsorb = 0;
this.weapon = weapons[getRandomInt(0,weapons.length - 1)];
this.dmgBonus = 0;

switch (this.armour){
case "leather armor":
this.dmgAbsorb = getRandomInt(1,3);
break;

case "chainmail":
this.dmgAbsorb = getRandomInt(4,7);    
break;

case "plate armor":
this.dmgAbsorb = getRandomInt(8,10);    
break;
}

switch (this.weapon){
    case "wooden club":
    this.dmgBonus = getRandomInt(1,3);
    break;
    
    case "axe":
    this.dmgBonus = getRandomInt(4,7);    
    break;
    
    case "two handed sword":
    this.dmgBonus = getRandomInt(8,10);    
    break;
    }




}


async attack (enemy){
await wait(3000);    
logFight(`Hit Test for ${this.name}`);    
const hit = getRandomInt(1,100);

if(hit<= this.hitChance){
const damage = getRandomInt(0,this.attackPower) + getRandomInt(0,this.dmgBonus);
const armorSave = getRandomInt(1,enemy.dmgAbsorb);
enemy.hp -= Math.max(0,damage - armorSave);
await wait(2000);
console.log(`${this.name} deals ${damage} damage to ${enemy.name}`);
logFight(`${this.name} deals ${damage} damage to ${enemy.name}`);
await wait(500);
console.log(`${enemy.armour} has absorbed ${armorSave} damage points`);
logFight(`${enemy.armour} has absorbed ${armorSave} damage points`);
} else{ logFight(`${this.name} missed the target!`);}
await wait(2000);

}
}

// Function Simulating Battle

async function simulateBattle (player1,player2){

startButton.disabled = true;    
let turnNumber = 0;

logFight(`A battle starts between ${player1.name} (HP: ${player1.hp} ) (DMG: ${player1.attackPower} ) and ${player2.name} (HP:${player2.hp} ) (DMG: ${player2.attackPower} )`);
await wait(3000);
logFight(`Player 1 - ${player1.name}  HP: ${player1.hp}   DMG: ${player1.attackPower}  `);
await wait(3000);
logFight(`Initiative: ${player1.initiative}  Armor: ${player1.armour}  ${player1.dmgAbsorb}  `);
logFight(`Weapon: ${player1.weapon} DMG Bonus: ${player1.dmgBonus}   Hit Chance: ${player1.hitChance} %`);
await wait(3000);
logFight(`Player 2 - ${player2.name}  HP: ${player2.hp}   DMG: ${player2.attackPower}  `);
logFight(`Weapon: ${player2.weapon} DMG Bonus: ${player2.dmgBonus}   Hit Chance: ${player2.hitChance} %`);
await wait(3000);
logFight(`Initiative: ${player2.initiative}  Armor: ${player2.armour}  ${player2.dmgAbsorb}  `);
await wait(3000);

refreshPlayerCards();

logFight(`Niech wygra lepszy, albo gorszy łotr, bo walka na stówę nie będzie czysta!`);



console.log(`A battle starts between ${player1.name} (HP: ${player1.hp} ) (DMG: ${player1.attackPower} ) and ${player2.name} (HP:${player2.hp} (DMG: ${player1.attackPower} ))`)
console.log("Niech wygra lepszy, albo gorszy łotr, bo walka na stówę nie będzie czysta!");

while (player1.hp > 0 && player2.hp > 0){

await wait(3000);
console.log(`Turn: ${turnNumber}`);
logFight(`Turn: ${turnNumber}`);
await wait(2000);
//initiative test
logFight('Initiative test');
await wait(2000);
let P1Ini = getRandomInt(1,player1.initiative);
let P2Ini = getRandomInt(1,player2.initiative);

logFight('Player 1: ' + P1Ini);
await wait(2000);
logFight('Player 2: ' + P2Ini);
await wait(2000);


if (P1Ini >= P2Ini){
    logFight('Player 1 attacks first!');

    await wait(2000);
    await player1.attack(player2);

    refreshPlayerCards();

    if (player2.hp <= 0){
        console.log(`${player2.name} has been defeated! ${player1.name} wins!`);
        logFight(`${player2.name} has been defeated! ${player1.name} wins!`);
        console.log(`Turn: ${turnNumber}`);
        logFight(`Turn: ${turnNumber}`);
        break;
    }
    
    await wait(3000);
    await player2.attack(player1);

    refreshPlayerCards();

    if (player1.hp <=0) {
        console.log(`${player1.name} has been defeated! ${player2.name} wins!`);
        logFight(`${player1.name} has been defeated! ${player2.name} wins!`);
        console.log(`Turn: ${turnNumber}`);
        logFight(`Turn: ${turnNumber}`);
        break;
    
     
    }


} else{
    logFight('Player 2 attacks first!')

    await wait(2000);
await player2.attack(player1);

refreshPlayerCards();

if (player1.hp <=0) {
    console.log(`${player1.name} has been defeated! ${player2.name} wins!`);
    logFight(`${player1.name} has been defeated! ${player2.name} wins!`);
    console.log(`Turn: ${turnNumber}`);
    logFight(`Turn: ${turnNumber}`);
    break;
}
await wait(3000);
await player1.attack(player2);

refreshPlayerCards();

if (player2.hp <= 0){
    console.log(`${player2.name} has been defeated! ${player1.name} wins!`);
    logFight(`${player2.name} has been defeated! ${player1.name} wins!`);
    console.log(`Turn: ${turnNumber}`);
    logFight(`Turn: ${turnNumber}`);
    break;
}

}


await wait(6000);
console.log(`End of Turn: ${turnNumber}`);
logFight(`End of Turn: ${turnNumber}`);
turnNumber++;  
}





console.log(`Wanna play again? Just click F5 on Your keyboard :)`);
logFight(`Wanna play again? Just click F5 on Your keyboard :)`);

}


// Initiate players!
const player1 = new Player("Player1");
const player2 = new Player("Player 2");

// Fight!

//simulateBattle(player1, player2);




