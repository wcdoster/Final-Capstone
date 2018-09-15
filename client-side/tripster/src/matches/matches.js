import React, { Component } from 'react'

class MatchPage extends Component {

    state = {
        userList: [],
        currentUser: []
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
                            if(match.traveler_1 === this.state.currentUser.url){
                            matchList.push(match.traveler_2)
                            } else if(match.traveler_2 === this.state.currentUser.url){
                                matchList.push(match.traveler_1)
                            }
                        });
                        console.log(matchList)
                        const userList = []
                        matchList.forEach(url => {
                            return fetch(url)
                                .then(r => r.json())
                                .then(result => {
                                    userList.push(result)
                                })
                                .then(() => {
                                    this.setState({ userList: userList })
                                })
                        })
                    })
            })
    }

    viewChat = function(e){
        this.props.setAppState({view: 'chat', chatUser: e.target.parentNode.id})
    }.bind(this)

    viewProfile = function (e) {
        this.props.setAppState({ view: 'matchProfile', viewingUserUrl: e.target.id })
    }.bind(this)

    render() {
        return (
            <div>
                {this.state.userList.map(user => (
                    <div id={user.url}>
                        <h2>{user.first_name}</h2>
                        <h4>{user.age}</h4>
                        <button id={user.url} onClick={this.viewProfile}>View Profile</button>
                        <button onClick={this.viewChat}>Chat</button>
                        <button>Remove</button>
                    </div>
                ))}
            </div>
        )
    }
}

export default MatchPage