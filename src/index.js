import React, {Component} from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import "./styles.css";
import UserForm from "./userform.js";

class App extends Component {
  state = {
    repos: null
  }
  getUser = (e) => {
    e.preventDefault();
    const user = e.target.elements.username.value;
    axios.get(`https://api.github.com/users/${user}`)
    .then((res) => {
      const repos = res.data.public_repos;
      this.setState({ repos });
    });
  }
  render(){
  return (
    <div className="App">
      <h1>Github Api</h1>
      <h2>Enter Your Github UserName: </h2>
      <UserForm getUser={this.getUser}/>
      { this.state.repos ? <p>No. of repos: {this.state.repos}</p> : <p>Please enter a valid username!</p>}
    </div>
  );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
