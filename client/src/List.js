import React from "react"
import ListElements from "./ListElements"
import axios from 'axios';

class List extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      item: "",

    };
  };
  
  componentDidMount() {
    this.setState({
        items: this.props.data
      });
  };

  handleChange = event => {
    this.setState({ item: event.target.value });
  };

  addElement = () => {
     // ============== Добавление элемента в БД ================
    axios.post('http://localhost:2000/listElement/', {
      item:this.state.item,
      editMode:false,
      serialNumber:this.state.items.length
    })
    .then((response) => {
      const postData = response.data
      const newItemsArr = this.state.items.concat(postData)
      this.setState({items: newItemsArr,item: ""});

    })
    .catch((error) => {console.log(error)})
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

    let clickedItemSerialNumber = this.state.items[currentIndex].serialNumber
    console.log('clickedItemSerialNumber', clickedItemSerialNumber)
    axios.patch(`http://localhost:2000/listElement/${this.state.items[currentIndex]._id}`, {
      serialNumber: clickedItemSerialNumber-1
    })
    .then((response) => {
      console.log(response.data)
      let elem = this.state.items.slice()
        elem.splice(Number(currentIndex)-1, 1, response.data);
        console.log(elem)
        this.setState({
            items: elem
          });})
    .catch((error) => {console.log(error)})

// ===================================

    let clickedItemSerialNumber2 = this.state.items[currentIndex-1].serialNumber
    console.log('clickedItemSerialNumber', clickedItemSerialNumber)
    axios.patch(`http://localhost:2000/listElement/${this.state.items[currentIndex-1]._id}`, {
      serialNumber: clickedItemSerialNumber2+1
    })
    .then((response) => {
      console.log(response.data)
      let elem = this.state.items.slice()
        elem.splice(Number(currentIndex), 1, response.data);
        console.log(elem)
        this.setState({
            items: elem
          });
          })
    .catch((error) => {console.log(error)})

  };

  down = event => {
    let currentIndex = event.target.value;

    let clickedItemSerialNumber = this.state.items[currentIndex].serialNumber
    console.log('clickedItemSerialNumber', clickedItemSerialNumber)
    axios.patch(`http://localhost:2000/listElement/${this.state.items[currentIndex]._id}`, {
      serialNumber: clickedItemSerialNumber+1
    })
    .then((response) => {
      console.log(response.data)
      let elem = this.state.items.slice()
        elem.splice(Number(currentIndex)+1, 1, response.data);
        console.log( 'ELEM', elem)
        this.setState({
            items: elem
          });})
    .catch((error) => {console.log(error)})

// ===================================

    let clickedItemSerialNumber2 = this.state.items[Number(currentIndex)+1].serialNumber
    console.log('clickedItemSerialNumber', clickedItemSerialNumber2)
    axios.patch(`http://localhost:2000/listElement/${this.state.items[Number(currentIndex)+1]._id}`, {
      serialNumber: clickedItemSerialNumber2-1
    })
    .then((response) => {
      console.log(response.data)
      let elem = this.state.items.slice()
        elem.splice(Number(currentIndex), 1, response.data);
        console.log(elem)
        this.setState({
            items: elem
          });
          })
    .catch((error) => {console.log(error)})


  };

  deleteElement = (event) => {
    let currentIndex = event.target.value;

// ============== Удаление элемента из БД ================
    axios.delete(`http://localhost:2000/listElement/${this.state.items[currentIndex]._id}`)
    .then((response) => {})
    .catch((error) => {console.log(error)})

// ============== Удаление элемента на экране ================
    this.state.items.splice(currentIndex, 1);
  this.setState({items: [...this.state.items]});
  };

  getState = () =>{
    console.log(this.state.items)
  }

  compareNumeric = (a, b) => {
    if (a.serialNumber > b.serialNumber) return 1; // если первое значение больше второго
    if (a.serialNumber == b.serialNumber) return 0; // если равны
    if (a.serialNumber < b.serialNumber) return -1; // если первое значение меньше второго
  }
  
  render() {
    return ( 
      <ul>
      { this.state.items.sort(this.compareNumeric).map((item, index ) => (
        <ListElements
         key={item._id}
         item = {item}
         index = {index}
         items = {this.state.items}
         up = {this.up}
         down = {this.down}
         deleteElement = {this.deleteElement}
         />) )}
        <input autoFocus onKeyUp={this.onKeyUp} onChange={this.handleChange} value={this.state.item}></input>
        <button onClick={this.addElement}>Add</button>
        <button onClick={this.getState}>Show State</button>
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
