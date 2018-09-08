import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Registration from './register/register'
import Login from './login/login'
import NavBar from './nav/nav'
import CreateUserPage from './userPage/createUserPage'
import UserPage from './userPage/createUserPage'
import EditUserProfile from './userPage/editUserPage'

class App extends Component {

  state = {
    authToken: "",
    user: "",
    userId:"",
    view: ""
  }

  componentDidMount() {
    const user = localStorage.getItem("user")
    const authToken = localStorage.getItem("token")

    if (user && authToken) {
      this.setState({
        authToken: authToken,
        user: user,
        view: "discover"
      })
    }else {
      this.setState({view: "login"})
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

  showView = function (view) {
    switch (this.state.view) {
      case "discover":
        return <h1>HELLO</h1>
      case "register":
        return <Registration setAppState={this.setAppState} />
      case "createUserPage":
        return <CreateUserPage authToken={this.state.authToken} userId={this.state.userId} />
      case "profile":
        return <UserPage setView={this.setView} />
      case "editUserPage":
        return <EditUserProfile authToken={this.state.authToken} />
      default:
      case "login":
        return <Login setAppState={this.setAppState} setView={this.setView} />
    }
  }.bind(this)

  showNav = function(){
    if(this.state.authToken){
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
