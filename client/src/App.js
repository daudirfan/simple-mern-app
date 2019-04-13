import React, { Component } from 'react';
import Axios from 'axios';

class App extends Component {

  state = {
    data: [],
    id: 0,
    message: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null
  }
  componentDidMount(){
    this.getDataFromDB();
    if(!this.state.intervalIsSet){
      let interval = setInterval(this.getDataFromDB, 1000);
      this.setState({ intervalIsSet: interval });
    }
  }
  getDataFromDB = () => {
    fetch("http://localhost:3001/api/getData").then(data => data.json()).then(res => this.setState({ data: res.data }));

  };
  putDataToDB = message => {
    let currentIDs = this.state.data.map(data => data.id);
    let idToBeAdded = 0;
    while(currentIDs.includes(idToBeAdded)){
      idToBeAdded++;
    }

    Axios.post("http://localhost:3001/api/putData", {id: idToBeAdded, message: message});

  };
  render() {
    const {data} = this.state;
    return (
      <div>
      <ul>
        {
          data.length <= 0
          ? "NO DB ENTRIES YET"
          : data.map( dat => (
              <li>{dat.message}</li>
            ))
        }
      </ul>
      
      <input
        type="text"
        onChange={e => this.setState({message: e.target.value})}
        placeholder="Add message here....."
      />
      <button
        onClick={() => this.putDataToDB(this.state.message)}
      > ADD </button>
      </div>
    );
  }
}

export default App;
