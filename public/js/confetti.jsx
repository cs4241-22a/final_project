'use strict';

const e = React.createElement;





class Confetti extends React.Component {
  constructor(props){
    super(props)
    this.state = {confetti: false}
  }

  render() {
    if(this.state.confetti){
        return "Have fun!"
    }
    
    return e(
      'button',
      {onClick: () => this.setState({confetti: true})},
      <button align="center">Fun Button</button>,
    );
  }
}


const domContainer = document.getElementById('confetti');
const root = ReactDOM.createRoot(domContainer);
root.render(e(Confetti));