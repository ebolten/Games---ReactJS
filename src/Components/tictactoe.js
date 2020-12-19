import React from 'react';
import Navbar from './navbar.js';

class TicTacToe extends React.Component {

    constructor(){
        super();
        this.state={
            player:['X','O'][Math.floor(Math.random() * 2)],
            turn:0,
            currentScore:{"X":0,"O":0}
        }
    }

    // load new hashmap with board
    loadBoard = () => {
        let gameBoard = new Map();
        for (var i = 1; i < 10; i++) {
            gameBoard.set(i.toString(),"");
        }
        return gameBoard;
    }
    
    // count the number of occurences of X or O in the array
    countOccurence = (arr) => {
        let numX = 0;
        let numO = 0;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === "X") {
                numX += 1;
                if (numX === 3) { return "X"; } 
            }
            else if (arr[i] === "O") { 
                numO += 1; 
                if (numO === 3) { return "O"; } 
            }
        }
        return "";
    }

    // check for a diagonal winner
    checkDiagonals = (board) => {
        let forwardDiagonal = this.countOccurence([board.get("1"),board.get("5"),board.get("9")]);
        let backwardDiagonal = this.countOccurence([board.get("3"),board.get("5"),board.get("7")]);

        if (forwardDiagonal !== "") { return forwardDiagonal; }
        if (backwardDiagonal){ return backwardDiagonal; }
    }

    // check for winners going down
    checkDown = (board) => {
        let downLeft =  this.countOccurence([board.get("1"),board.get("4"),board.get("7")]);
        let downMid =  this.countOccurence([board.get("2"),board.get("5"),board.get("8")]);
        let downRight =  this.countOccurence([board.get("3"),board.get("6"),board.get("9")]);

        if (downLeft) { return downLeft; }
        if (downMid){ return downMid; }
        if (downRight) { return downRight; }
    }

    // check for winners going across
    checkAcross = (board) => {
        let acrossTop =  this.countOccurence([board.get("1"),board.get("2"),board.get("3")]);
        let acrossMid =  this.countOccurence([board.get("4"),board.get("5"),board.get("6")]);
        let acrossBottom =  this.countOccurence([board.get("7"),board.get("8"),board.get("9")]);

        if (acrossTop) { return acrossTop; }
        if (acrossMid){ return acrossMid; }
        if (acrossBottom) { return acrossBottom; }
    }

    // check for winners diagonally, down or across
    checkWinner = (board) => {
        let diagonal =  this.checkDiagonals(board);
        let down =  this.checkDown(board);
        let across =  this.checkAcross(board);

        if (diagonal) { return diagonal; }
        else if (down) { return down; }
        else if (across) { return across; }
        return "";
    }


    onBoxClick = (event,gameBoard,modal,scoreText,span,playerTurn,i) => {

        let square = document.getElementById(event.srcElement.id); // get square object

        // create new text for square and add styling
        let playerNow = document.createElement('h1');
        playerNow.id = "player-" + event.srcElement.id;
        playerNow.innerText = this.state.player;
        
        playerNow.style.fontSize = "60px"; playerNow.style.marginTop = '10px';
        playerNow.style.position = 'fixed'; playerNow.style.marginLeft = '21px'; playerNow.style.marginRight = '25px';

        // set turn in gameboard
        if (gameBoard.get(event.srcElement.id) === "") { // if the spot is not filled
            gameBoard.set(event.srcElement.id,this.state.player);
            square.appendChild(playerNow);
            this.setState({ turn:this.state.turn+1 });
            let win = this.checkWinner(gameBoard);

            // if board becomes filled with no winners
            if (!win && this.state.turn === 9) {
                gameBoard = this.loadBoard();
                document.getElementById('modal-header').innerText = `The Board is Filled! Try Again.`;
                modal.style.display = "block";
                span.onclick = () => { // clear board and being new game
                    modal.style.display = "none";
                    this.setState({ turn:0 });
                    for (var j = 1; j < 10; j++) { // clear all turns on board
                        let elem = document.getElementById("player-" + j);

                        if (elem) { elem.parentNode.removeChild(elem); }
                        modal.style.display = "none";
                    }
                }
            }
            if (win) { // if a winner is found
                gameBoard = this.loadBoard();
                this.setState({ currentScore:this.state.currentScore+1 });

                scoreText.innerText = `Player X: ${this.state.currentScore['X']} - Player O: ${this.state.currentScore['O']}`;
                document.getElementById('modal-header').innerText = `${this.state.player} Is The Winner!`;

                modal.style.display = "block";
                span.onclick = () => { // clear board and being new game
                    modal.style.display = "none";
                    this.setState({ turn:0 });
                    for (var j = 1; j < 10; j++) { // clear all turns on board
                        var elem = document.getElementById("player-" + j);
                        if (elem) { elem.parentNode.removeChild(elem); }
                        modal.style.display = "none";
                        location.reload();
                    }
                }
            }
            if (i % 2 === 0) { // change players per turn
                if (this.state.player === "X") { this.setState({player:"O"}); }
                else { this.setState({player:"X"}); }
            } else if (i % 2 !== 0) { // depends on even/odd (every other turn)
                if (this.state.player === "X") { this.setState({player:"O"}); }
                else { this.setState({player:"X"}); }
            }
            playerTurn.innerText = `Player ${this.state.player}'s Turn!`;
        } else { // if the player tries to go for a spot that is already taken
            document.getElementById('modal-header').innerText = "That Spot is Taken!";
            modal.style.display = "block";
            span.onclick = function() {
                modal.style.display = "none";
            }
        }
    }


    // when elements have loaded
    componentDidMount() {
        document.title = "Tic Tac Toe";
        document.getElementById('who-turn').style.margin = '0px';
        document.getElementById('curr-score').style.margin = '5px';
        // theme changing buttons
        var polkaDotTheme = document.getElementById('plka-dts');
        polkaDotTheme.onclick = () => {
            // smaller squares
            let smallSquares = document.getElementsByClassName('square-sm');
            for (var i = 0; i < smallSquares.length; i++) {
                smallSquares[i].style.backgroundColor = 'white';
                smallSquares[i].style.border = '1px solid black';
            }
            // webpage body
            let body = document.getElementById('tictactoe');
            //body.style.backgroundPosition = "center";
            body.style.fontFamily = "'Poppins', sans-serif";
            //body.style.backgroundSize = 'cover';
            body.style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Polka_dots.svg/1200px-Polka_dots.svg.png')";
        }
        var blackWhiteTheme = document.getElementById('blck-wht');
        blackWhiteTheme.onclick = () => {
            // smaller squares
            let smallSquares = document.getElementsByClassName('square-sm');
            for (var i = 0; i < smallSquares.length; i++) {
                smallSquares[i].style.backgroundColor = 'transparent';
                smallSquares[i].style.border = '1px solid black';
            }
            // webpage body
            let body = document.getElementById('tictactoe');
            body.style.fontFamily = "'Poppins', sans-serif";
            body.style.backgroundColor = "white"; body.style.backgroundImage = "none";
        }
        var spaceTheme = document.getElementById('spce');
        spaceTheme.onclick = () => {
            // smaller squares
            let smallSquares = document.getElementsByClassName('square-sm');
            for (var i = 0; i < smallSquares.length; i++) {
                smallSquares[i].style.backgroundColor = 'Goldenrod';
                smallSquares[i].style.border = '3px solid black';
            }
            // webpage body
            let body = document.getElementById('tictactoe');
            body.style.backgroundRepeat = 'no-repeat'; body.style.backgroundSize = 'cover'; body.style.backgroundPosition = "center";
            body.style.fontFamily = '"Comic Sans MS", cursive, sans-serif';
            body.style.backgroundImage = "url('https://image.freepik.com/free-photo/cardboard-sheet-paper-abstract-texture-background_7182-2191.jpg')";
        }

        let playerTurn = document.getElementById('who-turn');
        let scoreText = document.getElementById('curr-score');
        
        playerTurn.innerText = `Player ${this.state.player}'s Turn!`;
        scoreText.innerText = `Player X: ${this.state.currentScore['X']} - Player O: ${this.state.currentScore['O']}`;

        let modal = document.getElementById("modal-div");
        let span = document.getElementsByClassName("close")[0];

        let gameBoard = this.loadBoard(); // load the empty board
        if (gameBoard) {

            // get all squares on board
            let squares = document.getElementsByClassName("square-sm");
            for (let i = 0; i < squares.length; i++) {
                // onclick method for square
                squares[i].onclick = (event) =>  this.onBoxClick(event,gameBoard,modal,scoreText,span,playerTurn,i);
            }
        }
    }
    render(){
        return(
            <div style={{paddingTop:"3%",height:"100vh"}} id="tictactoe">
                <Navbar/>
                {/* display current turn */}
                <div id="play-header">
                    <h1 id="who-turn"> </h1>
                    <h5 style={{visibility:'hidden'}} id="curr-score"> </h5>
                </div>

                {/* modal for error/winner messages */ }
                <div id="modal-div" className="modal">
                    {/* modal content */}
                    <div className="modal-content">
                        <span className="close">&times;</span>
                        <h1 id="modal-header"> </h1>
                    </div>
                </div>

                {/* game board (large square with 9 smaller squares) */}
                <div id='square' className="square">
                    <div id="1" className="square-sm"></div>
                    <div id="2" className="square-sm"></div>
                    <div id="3" className="square-sm"></div>
                    <br/>
                    <div id="4" className="square-sm"></div>
                    <div id="5" className="square-sm"></div>
                    <div id="6" className="square-sm"></div>
                    <br/>
                    <div id="7" className="square-sm"></div>
                    <div id="8" className="square-sm"></div>
                    <div id="9" className="square-sm"></div>
                </div>

                <div className="theme-div">
                    <div style={{backgroundColor:"white"}} id="blck-wht" className="square-theme"><div style={{backgroundColor:"black",height:"100%",float:"right",width:"55%"}} id="blck-wht-continue"></div></div>
                    <div style={{backgroundColor:"goldenrod"}} id='spce' className="square-theme"></div>
                    <div style={{backgroundPosition:"center",backgroundSize:"cover",backgroundImage:"url('https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Polka_dots.svg/1200px-Polka_dots.svg.png')"}} id='plka-dts' className="square-theme"></div>
                </div>
            </div>
        )
    }
}
export default TicTacToe;