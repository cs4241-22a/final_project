'use strict';


const e = React.createElement;
const titleRed = <h2 style={{color: 'red'}}>My Homework Assignments...click me</h2>;
const titleBlue = <h2 style={{color: 'blue'}}>My Homework Assignments...click me</h2>;




class Title extends React.Component {
  constructor(props){
    super(props)
    this.state = {title: false}
  }


  render() {
  
  if(this.state.title){
    return e(
      'header',
      {onClick: () => this.setState({title: false})},
      titleBlue,
    );
 }
 else{
  return e(
    'header',
    {onClick: () => this.setState({title: true})},
    titleRed,
  );
 }




  }
}


const domContainer = document.getElementById('title');
const root = ReactDOM.createRoot(domContainer);
root.render(e(Title));