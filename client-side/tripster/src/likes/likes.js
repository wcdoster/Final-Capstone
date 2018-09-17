import React, { Component } from 'react'
import { Button, Box } from 'bloomer'

class LikesPage extends Component {

    state = {
        currentUser: {},
        userList: []
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
                fetch(`http://127.0.0.1:8000/traveler-like/`
                    , {
                        method: 'GET',
                        headers: {
                            "authorization": `Token ${authToken}`
                        }
                    })
                    .then(r => r.json())
                    .then(result => {
                        console.log(result)
                        const likeList = []
                        result.forEach(like => {
                            if (like.receiver === this.state.currentUser.url) {
                                likeList.push(like)
                            }
                        });
                        console.log(likeList)
                        // debugger
                        const userList = []
                        if (likeList.length > 0) {
                            likeList.forEach(thisLike => {
                                return fetch(thisLike.sender)
                                    .then(r => r.json())
                                    .then(result => {
                                        // debugger
                                        const personObject = new Object(result)
                                        personObject.likeId = thisLike.id
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

    match = function (e) {
        const match = { traveler_1: this.state.currentUser.url, traveler_2: e.target.previousSibling.id }
        fetch(`http://127.0.0.1:8000/traveler-match/`, {
            method: 'POST',
            body: JSON.stringify(match),
            headers: {
                "Content-type": "application/json",
                'Accept': 'application/json, text/plain',
                "authorization": `Token ${this.props.authToken}`
            }
        })
    }.bind(this)



    viewProfile = function (e) {
        this.props.setAppState({ view: 'likeProfile', viewingUserUrl: e.target.id })
    }.bind(this)

    renderProfiles = function () {
        if (this.state.userList.length > 0) {
            return (
                <div>
                    {this.state.userList.map(user => (
                        <Box>
                            <div id={user.likeId}>
                                <h2>{user.first_name}</h2>
                                <h4>{user.age}</h4>
                                <Button isColor="primary" id={user.url} onClick={this.viewProfile}>View Profile</Button>
                                <Button isColor="success" onClick={this.match}>Match</Button>
                                <Button id={user.url} isColor="danger" onClick={this.remove}>Remove</Button>
                            </div>
                        </Box>
                    ))}
                </div>
            )
        } else {
            return (
                <div>
                    <h2>No Current Likes</h2>
                    <h3>Go to Discover Page to Find More Travelers</h3>
                </div>
            )
        }
    }.bind(this)

    remove = function (e) {
        // debugger
        const travelerId = e.target.parentNode.id
        const travelerRemove = { sender: this.state.currentUser.url, receiver: e.target.id }
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
                fetch(`http://127.0.0.1:8000/traveler-like/${travelerId}/`, {
                    method: 'DELETE',
                    headers: {
                        "Authorization": `Token ${this.props.authToken}`
                    }
                })
            }).then(() => {
                this.initialize()
            })
    }.bind(this)

    render() {
        return (
            <div>
                <h1>Likes</h1>
                {this.renderProfiles()}
            </div>
        )
    }
}

export default LikesPage