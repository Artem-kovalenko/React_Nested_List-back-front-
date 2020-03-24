import React from "react"
import ListElements from "./ListElements"

class List extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      text: ""
    };
  }

  handleChange = event => {
    this.setState({ text: event.target.value });
  };

  addElement = () => {
    if (!this.state.text.length) {
      return;
    }
    const newItem = {
      item: this.state.text,
      id: Date.now(),
      editMode: false
    };

    this.setState({
      items: this.state.items.concat(newItem),
      text: ""
    });
  };

  onKeyUp = event => {
    if (event.keyCode === 13) {
      this.addElement();
    }
  }

  render() {
    return (
      <ul>
      <ListElements state={this.state} />
         <input autoFocus onKeyUp={this.onKeyUp} onChange={this.handleChange} value={this.state.text}></input>
         <button onClick={this.addElement}>Add</button>
      </ul>
    );
  }
}

export default List
