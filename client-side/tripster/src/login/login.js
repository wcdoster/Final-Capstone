import React, { Component } from 'react'

class Login extends Component {

    state = {
        username: "",
        password: ""
    }

    postAuth = function (route, user) {
        // debugger
        console.log("postAuth called")
        console.log("user?", user)
        return fetch(`http://127.0.0.1:8000/${route}/`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json",
                'Accept': 'application/json, text/plain',
                // 'credentials': 'include'
            }
        })
            .then(r => r.json())
            .then(response => {
                console.log(response)
                console.log('converted token', response.token);
                localStorage.setItem("token", response.token)
                localStorage.setItem("user", this.state.username)
                // debugger
                this.props.setAppState({ authToken: response.token, user: response.username, userId: response.id })
                this.setState({
                    username: "",
                    password: ""
                })
                fetch(`http://127.0.0.1:8000/loggedin-traveler/`, {
                    method: 'GET',
                    headers: {
                        "authorization": `Token ${response.token}`
                    }
                })
                    .then(r => r.json())
                    .then(response => {
                        console.log(response)
                        const j = response[0]
                        this.props.setAppState({ userId: j.user, travelerUrl:j.url })
                        // this.props.getLikes()
                    })
            })
        // .then(()=>{
        //     fetch(`http://127.0.0.1:8000/users/?get_single_user=True`,{
        //         method: 'GET',
        //         headers: {
        //             "Content-type": "application/json",
        //             'Accept': 'application/json, text/plain',
        //             "authorization": `Token ${this.props.authToken}`
        //         }
        //     })
        //     .then(r=>r.json())
        //     .then(response=>console.log(response))
        // })
    }.bind(this)

    onChange = function (evt) {
        const stateToChange = {}
        stateToChange[evt.target.placeholder] = evt.target.value
        this.setState(stateToChange)
    }.bind(this)

    login = function () {
        const user = Object.assign({}, this.state)
        this.postAuth('api-token-auth', user)
            .then(() => {
                if (this.props.authToken) {
                    this.props.setAppState({ view: "discover" })
                }
            })
    }.bind(this)

    viewRegistration = function () {
        this.props.setAppState({ view: "register" })
    }.bind(this)

    render() {

        return (
            <div>
                <h1>Login</h1>
                <input type="text" placeholder="username" value={this.state.username} onChange={this.onChange} />
                <input type="password" placeholder="password" value={this.state.password} onChange={this.onChange} />
                <input type="submit" onClick={this.login} />
                <a onClick={this.viewRegistration}>Register</a>
            </div>
        )
    }
}

export default Login