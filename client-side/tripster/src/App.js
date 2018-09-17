import React, { Component } from 'react';
// import logo from './logo.svg';
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
import MatchUserPage from './matches/matchUserPage'
import Chat from './chat/chat'
import logo from './images/tripster_2.png'

class App extends Component {

  state = {
    authToken: "",
    user: "",
    userId: "",
    view: "",
    viewingUserUrl: "",
    chatUser: "",
    likeList: [],
    travelerUrl: ""
  }

  componentDidMount() {
    const user = localStorage.getItem("user")
    const authToken = localStorage.getItem("token")
    const userId = localStorage.getItem("userId")

    if (user && authToken) {
      this.getDiscoverUsers(authToken)
      this.setState({
        authToken: authToken,
        user: user,
        view: "discover"
      })
    } else {
      this.setState({ view: "login" })
    }
  }

  getDiscoverUsers = function (authToken) {
    const users = []
    const likeList = []
    const matchList = []
    const existingList = []
    const discoverList = []
    return fetch(`http://127.0.0.1:8000/loggedin-traveler/`, {
      method: 'GET',
      headers: {
        "authorization": `Token ${authToken}`
      }
    })
      .then(r => r.json())
      .then(response => {
        console.log(response)
        const j = response[0]
        const travelerUrl = j.url
        this.setState({ userId: j.user, travelerUrl: j.url })
        fetch(`http://127.0.0.1:8000/traveler-like/`, {
          method: 'GET',
          headers: {
            "authorization": `Token ${authToken}`
          }
        })
          .then(r => r.json())
          .then(likes => {
            console.log(likes)
            likes.forEach(like => {
              const thisLike = {}
              if (travelerUrl === (like.sender || like.receiver)) {
                existingList.push(like.sender)
                existingList.push(like.receiver)
              }
            })
            fetch(`http://127.0.0.1:8000/traveler-match/`, {
              method: 'GET',
              headers: {
                "authorization": `Token ${this.state.authToken}`
              }
            })
              .then(r => r.json())
              .then(matches => {
                matches.forEach(match => {
                  const thisMatch = {}
                  if (travelerUrl === (match.traveler_1 || match.traveler_2)) {
                    existingList.push(match.traveler_1)
                    existingList.push(match.traveler_2)
                  }
                })
                fetch(`http://127.0.0.1:8000/travelers/`)
                  .then(r => r.json())
                  .then(response => {
                    response
                    console.log(response)
                    response.forEach(person => {
                      if (existingList.indexOf(person.url) === -1 && person.url !== travelerUrl && person.city === j.city) {
                        discoverList.push(person)
                      }
                    })
                    this.setState({ discoverList: discoverList })
                  })
              })
          })
      })

  }.bind(this)


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
      case 'chat':
        return <Chat user={this.state.user} chatUser={this.state.chatUser} authToken={this.state.authToken} />
      case 'matchProfile':
        return <MatchUserPage viewingUserUrl={this.state.viewingUserUrl} setAppState={this.setAppState} authToken={this.state.authToken} />
      case 'matches':
        return <MatchPage setAppState={this.setAppState} />
      case "likeProfile":
        return <LikeProfile viewingUserUrl={this.state.viewingUserUrl} authToken={this.state.authToken} />
      case "likes":
        return <LikesPage setAppState={this.setAppState} authToken={this.state.authToken} />
      case "discover":
        return <Discover discoverList={this.state.discoverList} getDiscoverUsers={this.getDiscoverUsers} likeList={this.state.likeList} />
      case "register":
        return <Registration setAppState={this.setAppState} />
      case "createUserPage":
        return <CreateUserPage setAppState={this.setAppState} authToken={this.state.authToken} userId={this.state.userId} initialize={this.initialize} />
      case "profile":
        return <UserPage setAppState={this.setAppState} setView={this.setView} userId={this.state.userId} initialize={this.initialize} />
      case "editUserPage":
        return <EditUserProfile setAppState={this.setAppState} authToken={this.state.authToken} userId={this.state.userId} />
      default:
      case "login":
        return <Login getLikes={this.getLikes} setAppState={this.setAppState} setView={this.setView} authToken={this.state.authToken} />
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
        <div id="header">
          <img src={logo} alt='image' height='70' width='70'/>
        </div>
        {this.showView()}
        {this.showNav()}
      </div >
    )
  }
}

export default App;
