import List from "./List";
import React from "react";
import axios from "axios";


class App extends React.Component  {

    constructor(props) {
        super(props);
        this.state = {
          items: null
        };
    };

    componentDidMount(){ 
      axios.get('http://localhost:2000/listElement/')
      .then((response) => {
        const data = response.data
        this.setState({items: data});
      })
      .catch((error) => {
        console.log(error);
      });
    }

render() {
    return (
      <div>
        {this.state.items ? <List data={this.state.items} /> : null}
      </div>
    );
  }
}
export default App;
