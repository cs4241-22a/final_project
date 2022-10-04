'use strict';


const e = React.createElement;
const remove_assignment = <button id="remove_button">submit</button>;
const yes = false;

class RemoveAssignment extends React.Component {
  constructor(props){
    super(props)
    this.state = {successfully_removed: false}
  }



  render() {
    if(this.state.successfully_removed){
        return ("Successfully removed or not found...Reload to see results");
    }

    return e(
      'form',
      {onClick: () => this.setState({successfully_removed: true})},
      remove_assignment,
    );
  }
}


const domContainer = document.getElementById('special_remove_assignment');
const root = ReactDOM.createRoot(domContainer);
root.render(e(RemoveAssignment));




function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }


