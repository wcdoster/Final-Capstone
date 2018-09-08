import React, { Component } from 'react'

class Registration extends Component {

    state = {
        username: "",
        first_name: "",
        email: "",
        password: "",
    }

    onChange = function (evt) {
        const stateToChange = {}
        stateToChange[evt.target.placeholder] = evt.target.value
        this.setState(stateToChange)
    }.bind(this)

    postAuth = function (route, user) {
        // debugger
        console.log("postAuth called")
        console.log("user?", user)
        fetch(`http://127.0.0.1:8000/${route}/`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json",
                'Accept': 'application/json, text/plain'
            }
        })
            .then(r => r.json())
            .then(response => {
                console.log(response)
                console.log('converted token', response.token);
                localStorage.setItem("token", response.token)
                localStorage.setItem("user", this.state.username)
                this.props.setAppState({ authToken: response.token, user: response.username, userId: response.id })
                this.setState({
                    username: "",
                    first_name: "",
                    email: "",
                    password: "",
                })
                this.props.setAppState({view: "createUserPage"})
            })
    }.bind(this)

    register = function () {
        // debugger
        // create an object with all the form values and submit it to the Django API
        const user = Object.assign({}, this.state);
        this.postAuth("register", user)
        // .then(() => {
        //     debugger
        //     console.log("new user created")
        //     this.setAuthState({ showUserForm: false })
        // })
    }.bind(this)

    render() {
        return (
            <div>
                <input type="text" placeholder="username" value={this.state.username} onChange={this.onChange} />
                <input type="text" placeholder="first_name" value={this.state.first_name} onChange={this.onChange} />
                <input type="email" placeholder="email" value={this.state.email} onChange={this.onChange} />
                <input type="password" placeholder="password" value={this.state.password} onChange={this.onChange} />
                <input type="submit" onClick={this.register} value="submit" />
            </div>
        )
    }
}

export default Registration