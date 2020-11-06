import React from 'react';
import TicTacToeImg from './tictactoe.PNG';
import ConnectFourImg from './connect-4.PNG';

class Navbar extends React.Component {
    render(){
        return(
            <div style={{textAlign:"center",marginRight:"auto",marginLeft:"auto"}}>
                {/* sidebar navigation links between games */}  
                <a href="/tictactoe"><div style={{marginRight:"auto",marginLeft:"auto",position:"relative",display:"inline-block",width:"50px",height:"50px",padding:"5px",margin:"5px",border:"solid 1px black",backgroundPosition:"center",backgroundSize:"cover",backgroundImage:"url(" + TicTacToeImg + ")"}}></div></a>
                <a href="/connectfour"><div style={{marginRight:"auto",marginLeft:"auto",position:"relative",display:"inline-block",width:"50px",height:"50px",padding:"5px",margin:"5px",border:"solid 1px black",backgroundPosition:"center",backgroundSize:"cover",backgroundImage:"url(" + ConnectFourImg + ")"}}></div></a>
            </div>
        )
    }
}
export default Navbar;