// Sal DeMarco
// Program name: HW#7 – The Game of Pigs
// Write an application that simulates the Game of Pig.
// Author: Salvatore DeMarco, Jr.
// Date last modified: 11-March-2015

//declare global varibles
var BR = "\n";
var playerNum1, //user enters name
    playerNum2, //user enters name
    num1, // die1
    num2, // die2
    playerOneScore = 0, // player one score
    playerTwoScore = 0, // player two score
    currentPlayer = 1;
// player's turn to roll
var currentRoll = 0;
// add current player's points
var pigWin = new Audio("audio/Stadium Applause-SoundBible.com-1018949101.wav");
var pigSound = new Audio("audio/Snorting Pig-SoundBible.com-2115065847.wav");
var pigTing = new Audio("audio/shooting_star-Mike_Koenig-1132888100(1).wav");
var pigBoo = new Audio("audio/Crowd Boo 1-SoundBible.com-183064743.wav");
// inserts text in <td>
function insertText() {
	pigSound.play();
}

// allows user to reset game
function end() {
	location.reload();
}

function begin() {

	// ask users to enter name
	playerNum1 = prompt("Player One, Enter Your Name:");
	playerNum2 = prompt("Player Two, Enter Your Name:");

	// ask users to enter name again if failed the first time
	if (playerNum1 == "" || playerNum2 == "" || playerNum1 == null || playerNum2 == null) {
		alert("Please Enter Your Names Players One and Two!");
		location.reload();
	} else {
		document.getElementById("playerOne").innerHTML = " " + playerNum1;
		document.getElementById("playerTwo").innerHTML = " " + playerNum2;
		document.getElementById("action").innerHTML = " " + playerNum1;
		document.getElementById("scorerOne").innerHTML = " " + playerOneScore;
		document.getElementById("scorerTwo").innerHTML = " " + playerTwoScore;
	}

}

function rolling() {
	// rolls dice

	num1 = Math.ceil(Math.random() * 6);
	// dice 1
	num2 = Math.ceil(Math.random() * 6);
	// dice 2

	displayDice(num1, document.littlePigs.die1);
	displayDice(num2, document.littlePigs.die2);

}

//Calculate and create if statement for current user score

function update() {

	rolling();
	if (playerNum1 == "" || playerNum2 == "" || playerNum1 == null || playerNum2 == null) {
		alert("Please Enter Your Name(s) Players One and Two!");
		location.reload();
	}
	// add points if dices are not ones or snake eyes
	if (num1 != 1 && num2 != 1) {
		currentRoll = currentRoll + num1 + num2;
		document.getElementById("current").innerHTML = " " + currentRoll;
		pigTing.play();} 
		
		// indicates a one and snake eyes for player one
else {
		if (currentPlayer == 1) {
			if (num1 == 1 || num2 == 1) {
				document.getElementById("message").innerHTML = playerNum1 + ", you rolled a one and no points will be added to your score. It's now " + playerNum2 + "'s turn.";
				pigSound.play();
				document.getElementById("action").innerHTML = " " + playerNum2;
				currentPlayer = 0;

				if (num1 == num2) {
					document.getElementById("message").innerHTML = playerNum1 + ", you've rolled Snake Eyes! You will now lose all your points and it's still " + playerNum2 + "'s turn.";
					pigBoo.play();
					playerOneScore = 0;
					document.getElementById("scorerOne").innerHTML = " " + playerOneScore;

				}
			}
			// indicates a one and snake eyes for player two
		} else {
			if (num1 == 1 || num2 == 1) {
				document.getElementById("message").innerHTML = playerNum2 + ", you've rolled a one and no points will be added to your score. It's now " + playerNum1 + "'s turn.";
				pigSound.play();
				document.getElementById("action").innerHTML = " " + playerNum1;
				currentPlayer = 1;
				if (num1 == num2) {
					document.getElementById("message").innerHTML = playerNum2 + ", you rolled Snake Eyes! You will now lose all your points and it's still " + playerNum1 + "'s turn.";
					pigBoo.play();
					playerTwoScore = 0;
					document.getElementById("scorerTwo").innerHTML = " " + playerTwoScore;
				}
			}
		}
		currentRoll = 0;

		// indicates current score in GUI
		document.getElementById("current").innerHTML = " " + currentRoll;
	}

}

function passing() {
	// indicates if player one wants to pass
	if (currentPlayer == 1) {
		playerOneScore = playerOneScore + currentRoll;
		document.getElementById("message").innerHTML = playerNum1 + ", you elected to pass. " + currentRoll + " points will be added to your score. It's now " + playerNum2 + "'s turn.";
		document.getElementById("scorerOne").innerHTML = " " + playerOneScore;
		document.getElementById("action").innerHTML = " " + playerNum2;
		currentPlayer = 0;
		// indicate if player one won the game
		if (playerOneScore >= 100) {
			pigWin.play();
			alert(playerNum1 + ", YOU WON!!! " + "Your score of " + playerOneScore + " is over 100 points! The game will reset when you click the OK button." + BR + BR + "Final Score..." + BR + playerNum1 + ": " + playerOneScore + "pts WINNER!!!" + BR + playerNum2 + ": " + playerTwoScore + "pts LOSER!!!");

			end();

		}
		// indicates if player two wants to pass
	} else {
		playerTwoScore = playerTwoScore + currentRoll;
		document.getElementById("message").innerHTML = playerNum2 + ", you elected to pass. " + currentRoll + " points will be added to your score. It's now " + playerNum1 + "'s turn.";
		document.getElementById("scorerTwo").innerHTML = " " + playerTwoScore;
		document.getElementById("action").innerHTML = " " + playerNum1;
		currentPlayer = 1;
	}

	// indicate if player two won the game
	if (playerTwoScore >= 100) {
		pigWin.play();
		alert(playerNum2 + ", YOU WON!!! " + "Your score of " + playerTwoScore + " is over 100 points! The game will reset when you click the OK button." + BR + BR + "Final Score..." + BR + playerNum1 + ": " + playerOneScore + "pts LOSER!!!" + BR + playerNum2 + ": " + playerTwoScore + "pts WINNER!!!");
		end();
	}
	currentRoll = 0;
}

function displayDice(value, image) {

	//determines which dice image to display and displays it in the appropriate image object
	switch(value) {
	case 1:
		image.src = "img/dice1.png";
		break;
	case 2:
		image.src = "img/dice2.png";
		break;
	case 3:
		image.src = "img/dice3.png";
		break;
	case 4:
		image.src = "img/dice4.png";
		break;
	case 5:
		image.src = "img/dice5.png";
		break;
	case 6:
		image.src = "img/dice6.png";
		break;
	}
}

function rules() {

	alert("Each turn, a player repeatedly rolls a die until either a 1 is rolled or the player decides to hold:" + BR + "• If the player rolls a 1, they score nothing and it becomes the next player's turn. " + BR + "• If the player rolls any other number, it is added to their turn total and the player's turn continues." + BR + "• If a player chooses to hold, their turn total is added to their score, and it becomes the next player's turn." + BR + "The first player to score 100 or more points wins." + BR + "For example, the first player, Ann, begins a turn with a roll of 5. Ann could hold and score 5 points, but chooses to roll again. Ann rolls a 2, and could hold with a turn total of 7 points, but chooses to roll again. Ann rolls a 1, and must end her turn without scoring. The next player, Bob, rolls the sequence 4-5-3-5-5, after which he chooses to hold, and adds his turn total of 22 points to his score.");
}
