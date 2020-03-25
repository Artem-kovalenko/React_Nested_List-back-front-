import List from "./List";
import React from "react";
import axios from "axios";


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          items: []
        };
    };

    componentDidMount(){
        this.getRequest()
    }
    
    getRequest = () => {
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
        <List data={this.state.items} />
      </div>
    );
  }
}
export default App;
