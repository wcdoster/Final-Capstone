import React, { Component } from 'react'
import { Button, Box } from 'bloomer'
import './matches.css'

class MatchPage extends Component {

    state = {
        authToken: "",
        userList: [],
        currentUser: []
    }

    componentDidMount() {
        this.initialize()
    }

    initialize = function () {
        const authToken = localStorage.getItem('token')
        this.setState({ authToken: authToken })
        fetch(`http://127.0.0.1:8000/loggedin-traveler/`
            , {
                method: 'GET',
                headers: {
                    "authorization": `Token ${authToken}`
                }
            })
            .then(r => r.json())
            .then(j => {
                const result = j[0]
                this.setState({ currentUser: result })
                fetch(`http://127.0.0.1:8000/traveler-match/`
                    , {
                        method: 'GET',
                        headers: {
                            "authorization": `Token ${authToken}`
                        }
                    })
                    .then(r => r.json())
                    .then(result => {
                        console.log(result)
                        const matchList = []
                        result.forEach(match => {
                            if (match.traveler_1 === this.state.currentUser.url) {
                                matchList.push({ url: match.traveler_2, id: match.id })
                            } else if (match.traveler_2 === this.state.currentUser.url) {
                                matchList.push({ url: match.traveler_1, id: match.id })
                            }
                        });
                        console.log(matchList)
                        const userList = []
                        if (matchList.length > 0) {
                            matchList.forEach(person => {
                                return fetch(person.url)
                                    .then(r => r.json())
                                    .then(result => {
                                        const thisPerson = result
                                        thisPerson.matchId = person.id
                                        userList.push(result)
                                    })
                                    .then(() => {
                                        this.setState({ userList: userList })
                                    })
                            })
                        } else {
                            this.setState({ userList: [] })
                        }
                    })
            })
    }.bind(this)

    renderProfiles = function () {
        if (this.state.userList.length > 0) {
            return (
                <div>
                    {this.state.userList.map(user => (
                        <Box className="match--box">
                            <div id={user.url}>
                                <div className="match--div">
                                    <img className="match--image" src={user.profile_picture} />
                                    <div>
                                <h2>{user.first_name}</h2>
                                <h4>{user.age}</h4>
                                </div>
                                </div>
                                <Button isColor="primary" id={user.url} onClick={this.viewProfile}>View Profile</Button>
                                <Button isColor="success" onClick={this.viewChat}>Chat</Button>
                                <Button id={user.matchId} isColor="danger" onClick={this.remove}>Remove</Button>
                            </div>
                        </Box>
                    ))}
                </div>
            )
        } else {
            return (
                <div>
                    <h2>No Current Matches</h2>
                    <h3>Go to Discover Page to Find More Travelers</h3>
                </div>
            )
        }
    }.bind(this)

    viewChat = function (e) {
        this.props.setAppState({ view: 'chat', chatUser: e.target.parentNode.id })
    }.bind(this)

    viewProfile = function (e) {
        this.props.setAppState({ view: 'matchProfile', viewingUserUrl: e.target.id })
    }.bind(this)

    remove = function (e) {
        // debugger
        const matchId = e.target.id
        const travelerId = e.target.parentNode.id
        const travelerRemove = { sender: this.state.currentUser.url, receiver: travelerId }
        fetch('http://127.0.0.1:8000/traveler-remove/', {
            method: 'POST',
            body: JSON.stringify(travelerRemove),
            headers: {
                "Content-type": "application/json",
                'Accept': 'application/json, text/plain',
                "authorization": `Token ${this.state.authToken}`
            }
        })
            .then(() => {
                fetch(`http://127.0.0.1:8000/traveler-match/${matchId}/`, {
                    method: 'DELETE',
                    headers: {
                        "Authorization": `Token ${this.state.authToken}`
                    }
                })
            }).then(() => {
                this.initialize()
            })
    }.bind(this)

    render() {
        return (
            <div>
                <h1>Matches</h1>
                {this.renderProfiles()}
            </div>
        )
    }
}

export default MatchPage