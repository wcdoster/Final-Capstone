import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Registration from './register/register'
import Login from './login/login'
import NavBar from './nav/nav'
import CreateUserPage from './userPage/createUserPage'
import UserPage from './userPage/userPage'
import EditUserProfile from './userPage/editUserPage'
import Discover from './discover/discover'
import LikesPage from './likes/likes'
import LikeProfile from './likes/likeProfile'
import MatchPage from './matches/matches'

class App extends Component {

  state = {
    authToken: "",
    user: "",
    userId: "",
    view: "",
    viewingUserUrl: ""
  }

  componentDidMount() {
    const user = localStorage.getItem("user")
    const authToken = localStorage.getItem("token")
    const userId = localStorage.getItem("userId")

    if (user && authToken) {
      fetch(`http://127.0.0.1:8000/loggedin-traveler/`, {
        method: 'GET',
        headers: {
            "authorization": `Token ${authToken}`
        }
    })
        .then(r => r.json())
        .then(response => {
            console.log(response)
            const j = response[0]
            this.setState({userId: j.user})
        })
      this.setState({
        authToken: authToken,
        user: user,
        view: "discover"
      })
    } else {
      this.setState({ view: "login" })
    }
  }

  setAppState = function (stateObject) {
    this.setState(stateObject)
  }.bind(this)

  setView = function (e) {
    this.setState({
      view: e.target.id
    })
  }.bind(this)

  showView = function () {
    switch (this.state.view) {
      case 'matches':
        return <MatchPage />
      case "likeProfile":
        return <LikeProfile viewingUserUrl={this.state.viewingUserUrl} authToken={this.state.authToken} />
      case "likes":
        return <LikesPage setAppState={this.setAppState} />
      case "discover":
        return <Discover />
      case "register":
        return <Registration setAppState={this.setAppState} />
      case "createUserPage":
        return <CreateUserPage authToken={this.state.authToken} userId={this.state.userId} initialize={this.initialize} />
      case "profile":
        return <UserPage setView={this.setView} userId={this.state.userId} initialize={this.initialize} />
      case "editUserPage":
        return <EditUserProfile setAppState={this.setAppState} authToken={this.state.authToken} userId={this.state.userId} />
      default:
      case "login":
        return <Login setAppState={this.setAppState} setView={this.setView} authToken={this.state.authToken} />
    }
  }.bind(this)

  showNav = function () {
    if (this.state.authToken) {
      return (
        <NavBar setView={this.setView}
          setAppState={this.setAppState}
        />
      )
    }
  }.bind(this)

  render() {
    return (
      <div>
        {this.showNav()}
        <h1>Welcome to Tripster</h1>
        {this.showView()}
      </div>
    )
  }
}

export default App;
