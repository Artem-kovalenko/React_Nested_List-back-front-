import React from 'react'
import List from './List'

class ListElements extends React.Component {

  activeEditMode = event => {
    let index = event.target.value;
    let tempItems = this.props.items;
    if (tempItems[index].editMode === false){
      tempItems[index].editMode = true;
    } else if ( tempItems[index].editMode === true){
      tempItems[index].editMode = false;
    }
    this.setState({
        items: [...this.props.items]
    });
  };

  render() {
    return(
        <ul>
            <li key={this.props.item.id}>
            {this.props.item.item}
            { this.props.items[this.props.index].editMode === false && <button value={this.props.index} onClick={this.activeEditMode}>Add Sublist</button>}
            { this.props.items[this.props.index].editMode === true  && <button value={this.props.index} onClick={this.activeEditMode}>Remove Sublist</button>}

            {  this.props.index !== 0 &&<button value={this.props.index} onClick={this.props.up}>Up</button>}
            { (this.props.index !== this.props.items.length - 1) && <button value={this.props.index} onClick={this.props.down}>Down</button>}
            <button value={this.props.index} onClick={this.props.deleteElement}>Delete</button>
            { this.props.item.editMode && ( <ul> Sublist of element "{this.props.items[this.props.index].item}": <List /> </ul> )}
            </li>
        </ul>
    );
};

}
export default ListElements