import React from 'react'
import List from './List'

class ListElements extends React.Component {

 activeEditMode = event => {
    let index = event.target.value;
    let tempItems = this.props.state;
    if (tempItems.items[index].editMode === false){
      tempItems.items[index].editMode = true;
    } else if ( tempItems.items[index].editMode === true){
      tempItems.items[index].editMode = false;
    }
    this.setState({
        items: [...this.props.state.items]
    });
  };

  up = event => {
    let currentIndex = event.target.value;
    let elementUp = this.props.state.items.splice(currentIndex, 1);
    this.props.state.items.splice(Number(currentIndex)-1, 0, elementUp[0]);
    
    this.setState({
      items: [...this.props.state.items]
    });
  };

  down = event => {
    let currentIndex = event.target.value;
    let elementDown = this.props.state.items.splice(currentIndex, 1);
    this.props.state.items.splice(Number(currentIndex)+1, 0, elementDown[0]); 
    
    this.setState({
      items: [...this.props.state.items]
    });
  };

  deleteElement = event => {
    let currentIndex = event.target.value;
    this.props.state.items.splice(currentIndex, 1);

    this.setState({
        items: [...this.props.state.items]
    });
  };

  render() {
        return(
            <ul>
                {this.props.state.items.map((item, index) => (
                <li key={item.id}>
                {item.item}
                { this.props.state.items[index].editMode === false && <button value={index} onClick={this.activeEditMode}>Add Sublist</button>}
                { this.props.state.items[index].editMode === true && <button value={index} onClick={this.activeEditMode}>Remove Sublist</button>}
                {index !== 0 && <button value={index} onClick={this.up}>Up</button>}
                { (index !== this.props.state.items.length - 1) && <button value={index} onClick={this.down}>Down</button>}
                <button value={index} onClick={this.deleteElement}>Delete</button>
                {item.editMode && ( <ul> Sublist of element "{this.props.state.items[index].item}": <List /> </ul> )}
                </li>
                ))}
            </ul>
        );
  };
}
export default ListElements