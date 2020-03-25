import React from "react"
import ListElements from "./ListElements"
import axios from 'axios';

class List extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      text: ""
    };
  };
  

  handleChange = event => {
    this.setState({ text: event.target.value });
    console.log()
  };

  addElement = () => {

    // по нажатию на кнопку нужно сделать пост запрос для создания элемента в базе (и как-то сделать чтоб элементы автоматически показывались на экране)

    if (!this.state.text.length) {
      return;
    }
    const newItem = {
      id: Date.now(),
      item: this.state.text,
      editMode: false
    };


    this.setState({
      items: this.props.data,
      text: ""
    });
  };

  onKeyUp = event => {
    if (event.keyCode === 13) {
      this.addElement();
    }
  };

  up = event => {
    let currentIndex = event.target.value;
    let elementUp = this.state.items.splice(currentIndex, 1);
    this.state.items.splice(Number(currentIndex)-1, 0, elementUp[0]);
    
    this.setState({
      items: [...this.state.items]
    });
  };

  down = event => {
    let currentIndex = event.target.value;
    let elementDown = this.state.items.splice(currentIndex, 1);
    this.state.items.splice(Number(currentIndex)+1, 0, elementDown[0]); 
    
    this.setState({
      items: [...this.state.items]
    });
    console.log(currentIndex);
  };

  deleteElement = event => {
    let currentIndex = event.target.value;
    this.state.items.splice(currentIndex, 1);

    this.setState({
        items: [...this.state.items]
    });
  };

  render() {
    return (
      <ul>
      { this.state.items.map((item, index) => ( 
        <ListElements  
        item={item} 
        index={index} 
        items={this.state.items}
        up={this.up}
        down={this.down}
        deleteElement={this.deleteElement}/>))}
        <input autoFocus onKeyUp={this.onKeyUp} onChange={this.handleChange} value={this.state.text}></input>
        <button onClick={this.addElement}>Add</button>
      </ul>
    );
  }
}

export default List
