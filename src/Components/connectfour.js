import React from 'react';
import Navbar from './navbar.js';
/* TO DO
* develop diagonal wins
* develop across wins
*/
class ConnectFour extends React.Component {
    constructor(){
        super();
        this.state={
            withComputer:true,
            player:['Red','Blue'][Math.floor(Math.random() * 2)],
            turn:0,
            currentScore:{"Red":0,"Blue":0}
        }
    }

    // load gameboard
    loadBoard = () => {
        let gameBoard = [[],[],[],[],[],[],[]];
        for (var i = 1; i < 7; i++) {
            for (var j = 0; j < 6; j++) {
                gameBoard[i].push("");
            }
        }
        return gameBoard;
    }

    // count the number of occurences of X or O in the array
    countOccurence = (arr,key=0) => {
        let next = arr[key];
        if (arr.length-key >= 4) {
            let times = 0;
            for (var i = key; i < arr.length; i++) {
                times+=1;
                if (arr[i] !== arr[key]) { return this.countOccurence(arr,key+(i-key)); }
                if (times === 4) { return next; }
            }
        } else { return 0; }
    }

    // check if diagonal pattern of 4 is found
    getDiagonal = (board) => {
        // get all right diagonals
        let rightDiagonalThree = this.countOccurence([ board[2][0],board[3][1],board[4][2],board[5][3] ]);
        let rightDiagonalTwo = this.countOccurence([ board[1][0],board[2][1],board[3][2],board[4][3],board[5][4] ]);
        let rightDiagonalOne = this.countOccurence([ board[0][0],board[1][1],board[2][2],board[3][3],board[4][4],board[5][5] ]);
        let rightDiagonalFour = this.countOccurence([ board[0][1],board[1][2],board[2][3],board[3][4],board[4][5] ]);
        let rightDiagonalFive = this.countOccurence([ board[0][2],board[1][3],board[2][4],board[3][5] ]);
        // get all left diagonals
        let lefttDiagonalThree = this.countOccurence([ board[3][0],board[2][1],board[1][2],board[0][3] ]);
        let lefttDiagonalTwo = this.countOccurence([ board[4][0],board[3][1],board[2][2],board[1][3],board[0][4] ]);
        let leftDiagonalOne = this.countOccurence([ board[5][0],board[4][1],board[3][2],board[2][3],board[1][4],board[0][5] ]);
        let lefttDiagonalFour = this.countOccurence([ board[5][1],board[4][2],board[3][3],board[2][4],board[1][5] ]);
        let lefttDiagonalFive = this.countOccurence([ board[5][2],board[4][3],board[3][4],board[4][5] ]);
        // check right diagonals
        if (rightDiagonalThree) { return rightDiagonalThree; } if (rightDiagonalTwo) { return rightDiagonalTwo; }
        if (rightDiagonalOne) { return rightDiagonalOne; } if (rightDiagonalFour) { return rightDiagonalFour; }
        if (rightDiagonalFive) { return rightDiagonalFive; }
        // check left diagonals
        if (lefttDiagonalThree) { return lefttDiagonalThree; } if (lefttDiagonalTwo) { return lefttDiagonalTwo; }
        if (leftDiagonalOne) { return leftDiagonalOne; } if (lefttDiagonalFour) { return lefttDiagonalFour; }
        if (lefttDiagonalFive) { return lefttDiagonalFive; }
        return false;
    }

    // find whether there is a pattern going down
    getDown = (board) => {
        // check all places for pattern down
        let downOne = this.countOccurence(board[1]);
        let downTwo = this.countOccurence(board[2]);
        let downThree = this.countOccurence(board[3]);
        let downFour = this.countOccurence(board[4]);
        let downFive = this.countOccurence(board[5]);
        let downSix = this.countOccurence(board[6]);
        // check for pattern down 
        if (downOne) { return downOne; } if (downTwo) { return downTwo; }
        if (downThree) { return downThree; } if (downFour) { return downFour; }
        if (downFive) { return downFive; } if (downSix) { return downSix; }
        return false;
    }

    // find whether there is a pattern going accross
    getAccross = (board) => {
        // check all places for pattern down
        let accrossOne = this.countOccurence([ board[1][6],board[1][6],board[2][6],board[3][6],board[4][6],board[6][6] ]);
        let accrossTwo = this.countOccurence([ board[1][0],board[1][1],board[1][2],board[1][3],board[1][4],board[1][5] ]);
        let accrossThree = this.countOccurence([ board[2][0],board[2][1],board[2][2],board[2][3],board[2][4],board[2][5] ]);
        let accrossFour = this.countOccurence([ board[3][0],board[3][1],board[3][2],board[3][3],board[3][4],board[3][5] ]);
        let accrossFive = this.countOccurence([ board[4][0],board[4][1],board[4][2],board[4][3],board[4][4],board[4][5] ]);
        let accrossSix = this.countOccurence([ board[5][0],board[5][1],board[5][2],board[5][3],board[5][4],board[5][5] ]);
        // check for pattern accross
        if (accrossOne) { return accrossOne; } if (accrossTwo) { return accrossTwo; }
        if (accrossThree) { return accrossThree; } if (accrossFour) { return accrossFour; }
        if (accrossFive) { return accrossFive; } if (accrossSix) { return accrossSix; }
        return false;
    }

    // when elements load
    componentDidMount(){
        let gameBoard = this.loadBoard();
        let turnHeader = document.getElementById('who-turn');
        turnHeader.innerText = `${this.state.player}'s Turn!`;
        let scoreHeader = document.getElementById('curr-score');
        scoreHeader.innerText = `Red: ${this.state.currentScore['Red']}, Blue: ${this.state.currentScore["Blue"]}`;

        for (var i = 1; i < 7; i++) {
            var currArrow = document.getElementById(`arrow-${i}`);

            currArrow.onclick = (event) => {
                var row = parseInt(event.target.id.split('-')[1]);

                for (var j = 0; j < gameBoard[row].length; j++) {
                    if (!gameBoard[row][j]) {
                        gameBoard[row][j] = this.state.player;
                        document.getElementById(`${(gameBoard[row].length-1)-j}${row}`).style.backgroundColor = this.state.player;
                        // find if theres a winner
                        if (this.getAccross(gameBoard)) {
                            let modal = document.getElementById("modal-div");
                            let span = document.getElementsByClassName("close")[0];
                            document.getElementById('modal-header').innerText = `${this.getAccross(gameBoard)} Wins Down!`;
                            var newScore = this.state.currentScore;
                            newScore[this.getAccross(gameBoard)] += 1;
                            this.setState({ currentScore:newScore });
                            scoreHeader.innerText = `Red: ${this.state.currentScore['Red']}, Blue: ${this.state.currentScore["Blue"]}`;;

                            gameBoard = this.loadBoard();
                            modal.style.display = "block";
                            span.onclick = () => { // clear board and being new game
                                modal.style.display = "none";
                                this.setState({ turn:0 });
                                /*for (var j = 1; j < 10; j++) { // clear all turns on board
                                    let elem = document.getElementById("player-" + j);

                                    if (elem) { elem.parentNode.removeChild(elem); }
                                    modal.style.display = "none";
                                }*/
                            }

                        } else if (this.getDiagonal(gameBoard)) {
                            let modal = document.getElementById("modal-div");
                            let span = document.getElementsByClassName("close")[0];
                            document.getElementById('modal-header').innerText = `${this.getDiagonal(gameBoard)} Wins Diagonal!`;
                            var newScore = this.state.currentScore;
                            newScore[this.getDiagonal(gameBoard)] += 1;
                            this.setState({ currentScore:newScore });
                            scoreHeader.innerText = `Red: ${this.state.currentScore['Red']}, Blue: ${this.state.currentScore["Blue"]}`;;

                            gameBoard = this.loadBoard();
                            modal.style.display = "block";
                            span.onclick = () => { // clear board and being new game
                                modal.style.display = "none";
                                this.setState({ turn:0 });
                                /*for (var j = 1; j < 10; j++) { // clear all turns on board
                                    let elem = document.getElementById("player-" + j);

                                    if (elem) { elem.parentNode.removeChild(elem); }
                                    modal.style.display = "none";
                                }*/
                            }
                        } else if (this.getDown(gameBoard)) {
                            let modal = document.getElementById("modal-div");
                            let span = document.getElementsByClassName("close")[0];
                            document.getElementById('modal-header').innerText = `${this.getDown(gameBoard)} Wins Down!`;
                            var newScore = this.state.currentScore;
                            newScore[this.getDown(gameBoard)] += 1;
                            this.setState({ currentScore:newScore });
                            scoreHeader.innerText = `Red: ${this.state.currentScore['Red']}, Blue: ${this.state.currentScore["Blue"]}`;;

                            gameBoard = this.loadBoard();
                            modal.style.display = "block";
                            span.onclick = () => { // clear board and being new game
                                modal.style.display = "none";
                                this.setState({ turn:0 });
                                /*for (var j = 1; j < 10; j++) { // clear all turns on board
                                    let elem = document.getElementById("player-" + j);

                                    if (elem) { elem.parentNode.removeChild(elem); }
                                    modal.style.display = "none";
                                }*/
                            }
                        }
                        break;
                    }
                }
                this.setState({ player:this.state.player === "Red" ? "Blue" : "Red" });
                turnHeader.innerText = `${this.state.player}'s Turn!`;
            }
        }
    }
    render(){
        return(
            <div id="connect4" style={{height:"100vh"}}>
                <Navbar/>
                {/* display current turn */}
                <div style={{textAlign:"center"}}>
                    <h1 style={{color:"black"}} id="who-turn"></h1>
                    <h5 id="curr-score"></h5>
                </div>

                {/* modal for error/winner messages */}
                <div id="modal-div" className="modal">
                    {/* modal content */}
                    <div className="modal-content">
                        <span className="close">&times;</span>
                        <h1 id="modal-header"></h1>
                    </div>
                </div>

                <button className="arrow-btn"><span id="arrow-1" style={{fontSize:'45px'}}>&#8681;</span></button>
                <button className="arrow-btn"><span id="arrow-2" style={{fontSize:'45px'}}>&#8681;</span></button>
                <button className="arrow-btn"><span id="arrow-3" style={{fontSize:'45px'}}>&#8681;</span></button>
                <button className="arrow-btn"><span id="arrow-4" style={{fontSize:'45px'}}>&#8681;</span></button>
                <button className="arrow-btn"><span id="arrow-5" style={{fontSize:'45px'}}>&#8681;</span></button>
                <button className="arrow-btn"><span id="arrow-6" style={{fontSize:'45px'}}>&#8681;</span></button>

                {/* game board (large square with 9 smaller squares) */}
                <div id='connect4-square' className="connect4-square">
                    <div id="01" className="connect4-square-sm"></div>
                    <div id="02" className="connect4-square-sm"></div>
                    <div id="03" className="connect4-square-sm"></div>
                    <div id="04" className="connect4-square-sm"></div>
                    <div id="05" className="connect4-square-sm"></div>
                    <div id="06" className="connect4-square-sm"></div>
                    <br/>
                    <div id="11" className="connect4-square-sm"></div>
                    <div id="12" className="connect4-square-sm"></div>
                    <div id="13" className="connect4-square-sm"></div>
                    <div id="14" className="connect4-square-sm"></div>
                    <div id="15" className="connect4-square-sm"></div>
                    <div id="16" className="connect4-square-sm"></div>
                    <br/>
                    <div id="21" className="connect4-square-sm"></div>
                    <div id="22" className="connect4-square-sm"></div>
                    <div id="23" className="connect4-square-sm"></div>
                    <div id="24" className="connect4-square-sm"></div>
                    <div id="25" className="connect4-square-sm"></div>
                    <div id="26" className="connect4-square-sm"></div>
                    <br/>
                    <div id="31" className="connect4-square-sm"></div>
                    <div id="32" className="connect4-square-sm"></div>
                    <div id="33" className="connect4-square-sm"></div>
                    <div id="34" className="connect4-square-sm"></div>
                    <div id="35" className="connect4-square-sm"></div>
                    <div id="36" className="connect4-square-sm"></div>
                    <br/>
                    <div id="41" className="connect4-square-sm"></div>
                    <div id="42" className="connect4-square-sm"></div>
                    <div id="43" className="connect4-square-sm"></div>
                    <div id="44" className="connect4-square-sm"></div>
                    <div id="45" className="connect4-square-sm"></div>
                    <div id="46" className="connect4-square-sm"></div>
                    <br/>
                    <div id="51" className="connect4-square-sm"></div>
                    <div id="52" className="connect4-square-sm"></div>
                    <div id="53" className="connect4-square-sm"></div>
                    <div id="54" className="connect4-square-sm"></div>
                    <div id="55" className="connect4-square-sm"></div>
                    <div id="56" className="connect4-square-sm"></div>
                </div>

            </div>
        )
    }
}
export default ConnectFour;