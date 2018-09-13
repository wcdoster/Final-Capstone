import React, { Component } from 'react'

class LikesPage extends Component {

    state = {
        currentUser: "",
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
                .then(r=>r.json())
                .then(result=>{
                    const likeList = []
                    result.forEach(like => {
                        likeList.push(like.sender)
                    });
                    console.log(likeList)
                    const userList = []
                    likeList.forEach(url => {
                        return fetch(url)
                        .then(r=>r.json())
                        .then(result=>{
                            userList.push(result)
                        })
                        .then(()=>{
                            this.setState({userList: userList})
                        })
                    })
                })
            })
    }

    viewProfile = function(e) {
        this.props.setAppState({view:'likeProfile', viewingUserUrl: e.target.id})
    }.bind(this)

    render() {
        return (
            <div>
                {this.state.userList.map(user=>(
                    <div>
                        <h2>{user.first_name}</h2>
                        <h4>{user.age}</h4>
                        <button id={user.url} onClick={this.viewProfile}>View Profile</button>
                        <button>Match</button>
                        <button>Remove</button>
                    </div>

                ))}
            </div>
        )
    }
}

export default LikesPage