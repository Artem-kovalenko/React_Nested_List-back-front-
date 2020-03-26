import React from "react"
import ListElements from "./ListElements"
import axios from 'axios';

class List extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      item: ""
    };
  };
  
  componentDidMount() {
    this.setState({
        items: this.props.data
      });
  };

  handleChange = event => {
    this.setState({ item: event.target.value });
    console.log(this.state.item)
  };

  addElement = () => {
     // ============== Добавление элемента в БД ================
    axios.post('http://localhost:2000/listElement/', {
      item:this.state.item,
      editMode:false
    })
    .then((response) => {
      const postData = response.data
      const newItemsArr = this.state.items.concat(postData)
      this.setState({items: newItemsArr,item: ""});
      console.log(response.data);
    })
    .catch((error) => {console.log(error)})
    console.log(this.state.items);

    // if (!this.state.text.length) {
    //   return;
    // }
    // const newItem = {
    //   id: Date.now(),
    //   item: this.state.text,
    //   editMode: false
    // };


    // this.setState({
    //   items: this.props.data,
    //   text: ""
    // });
  };

  onKeyUp = event => {
    if (event.keyCode === 13) {
      this.addElement();
    }
  };

  up = event => {
    let currentIndex = event.target.value;
    // let elementUp = this.state.items.splice(currentIndex, 1);
    // this.state.items.splice(Number(currentIndex)-1, 0, elementUp[0]);

    // this.setState({
    //   items: [...this.state.items]
    // });

    let clickedItemText = this.state.items[currentIndex].item
    axios.patch(`http://localhost:2000/listElement/${this.state.items[currentIndex-1]._id}`, {
      item: clickedItemText
    })
    .then((response) => {console.log(response)})
    .catch((error) => {console.log(error)})

    let clickedItemText2 = this.state.items[currentIndex-1].item
    axios.patch(`http://localhost:2000/listElement/${this.state.items[currentIndex]._id}`, {
      item: clickedItemText2
    })
    .then((response) => {console.log(response)})
    .catch((error) => {console.log(error)})
    
  };

  down = event => {
    let currentIndex = event.target.value;
    // let elementDown = this.state.items.splice(currentIndex, 1);
    // this.state.items.splice(Number(currentIndex)+1, 0, elementDown[0]); 
    
    // this.setState({
    //   items: [...this.state.items]
    // });
    // console.log(currentIndex);

    let clickedItemText = this.state.items[currentIndex].item
    console.log(clickedItemText)
    axios.patch(`http://localhost:2000/listElement/${this.state.items[Number(currentIndex)+1]._id}`, {
      item: clickedItemText
    })
    .then((response) => {console.log(response)})
    .catch((error) => {console.log(error)})

    let clickedItemText2 = this.state.items[Number(currentIndex)+1].item
    axios.patch(`http://localhost:2000/listElement/${this.state.items[currentIndex]._id}`, {
      item: clickedItemText2
    })
    .then((response) => {console.log(response)})
    .catch((error) => {console.log(error)})
  };

  deleteElement = (event) => {
    let currentIndex = event.target.value;

// ============== Удаление элемента из БД ================
    axios.delete(`http://localhost:2000/listElement/${this.state.items[currentIndex]._id}`)
    .then((response) => {console.log(response)})
    .catch((error) => {console.log(error)})

// ============== Удаление элемента на экране ================
    this.state.items.splice(currentIndex, 1);
  this.setState({items: [...this.state.items]});
  };
  render() {
    return ( 
      <ul>
      { this.state.items.map((item, index ) => (
        <ListElements
         item = {item}
         index = {index}
         items = {this.state.items}
         up = {this.up}
         down = {this.down}
         deleteElement = {this.deleteElement}

         />) )}
        <input autoFocus onKeyUp={this.onKeyUp} onChange={this.handleChange} value={this.state.item}></input>
        <button onClick={this.addElement}>Add</button>
      </ul>
    );
  }
}

export default List



  // ======================================== Рендер чтоб показывались элементы и кнопка удалить
  // render() {
  //   return (
  //     <ul>
  //     { this.state.items.map((item, index ) => (<div key = {item._id}>{item.item}<button value={index} onClick={this.deleteElement} >Delete</button></div>) )}
  //       <input autoFocus onKeyUp={this.onKeyUp} onChange={this.handleChange} value={this.state.item}></input>
  //       <button onClick={this.addElement}>Add</button>
  //     </ul>
  //   );
  // }

  //=================================== Рендер до взаимодействия с БД
  // render() {
  //   return (
  //     <ul>
  //     { this.state.items.map((item, index) => ( 
  //       <ListElements  
  //       item={item} 
  //       index={index} 
  //       items={this.state.items}
  //       up={this.up}
  //       down={this.down}
  //       deleteElement={this.deleteElement}/>))}
  //       <input autoFocus onKeyUp={this.onKeyUp} onChange={this.handleChange} value={this.state.text}></input>
  //       <button onClick={this.addElement}>Add</button>
  //     </ul>
  //   );
  // }
