import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import "./styles.css";
import UserForm from "./userform.js";

class App extends Component {
  state = {
    avatar_url: '',
    name: '',
    repos: null,
    gists: null,
    blog: '',
    bio: '',
    followers: null,
    following: null,
  };
  getUser = e => {
    e.preventDefault();
    const user = e.target.elements.username.value;
    axios.get(`https://api.github.com/users/${user}`)
    .then((username) => {
      console.log(username);
      if(username.message !== 'Not Found')
      {
        username = username.data;
        const avatar_url = username.avatar_url;
        const name = username.name;
        const repos = username.public_repos;
        const gists = username.public_gists;
        const blog = username.blog;
        const bio = username.bio;
        const followers = username.followers;
        const following = username.following;
        this.setState({ avatar_url, name, repos, gists, blog, bio, followers, following });
        axios.get(`https://api.github.com/users/${user}/following`)
        .then((followings) => {
          var i=0;
          for(i=0;i<following;i++) console.log(followings.data[i].login);
        });
      }
      else { this.setState({ repos: null}); console.log('in else'); return;}
    });
  };
  render() {
    return (
      <div className="App">
        <h1>Github Api</h1>
        <h2>Enter Your Github UserName: </h2>
        <UserForm getUser={this.getUser} />
        {this.state.repos ? (
          <p><img src={this.state.avatar_url} alt="Avatar"></img>Name: {this.state.name}<br />No. of public repos: {this.state.repos}<br />No. of public gists: {this.state.gists}<br />Blog Link: <a href={this.state.blog}>{this.state.blog}</a><br />Bio: {this.state.bio}<br />No. of followers: {this.state.followers}<br />No. of following: {this.state.following}</p>
        ) : (
          <p>Please enter a valid username!</p>
        )}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
