import React, { Component } from 'react'

class LikesPage extends Component {

    state = {
        currentUser: {},
        userList: []
    }

    componentDidMount() {
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
                        const userList = []
                        likeList.forEach(thisLike => {
                            return fetch(thisLike.sender)
                                .then(r => r.json())
                                .then(result => {
                                    const personObject = new Object(result)
                                    personObject.likeId = thisLike.id
                                    userList.push(result)
                                })
                                .then(() => {
                                    this.setState({ userList: userList })
                                })
                        })
                    })
            })
    }

    match = function (e) {
        const match = {traveler_1: this.state.currentUser.url, traveler_2: e.target.previousSibling.id}
        fetch(`http://127.0.0.1:8000/traveler-match/`,{
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

    remove = function(e){
        fetch(`http://127.0.0.1:8000/traveler-like/${e.target.parentNode.id}/`,{
            method: 'DELETE',
            headers: {
                "authorization": `Token ${this.props.authToken}`
            }
        })
    }.bind(this)

    render() {
        return (
            <div>
                {this.state.userList.map(user => (
                    <div id={user.likeId}>
                        <h2>{user.first_name}</h2>
                        <h4>{user.age}</h4>
                        <button id={user.url} onClick={this.viewProfile}>View Profile</button>
                        <button onClick={this.match}>Match</button>
                        <button onClick={this.remove}>Remove</button>
                    </div>

                ))}
            </div>
        )
    }
}

export default LikesPage