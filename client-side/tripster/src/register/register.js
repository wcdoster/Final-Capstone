import React, { Component } from 'react'
import { Button, Field, Input } from 'bloomer'

class Registration extends Component {

    state = {
        username: "",
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
                // debugger
                console.log(response)
                console.log('converted token', response.token);
                localStorage.setItem("token", response.token)
                localStorage.setItem("user", response.username)
                localStorage.setItem("userId", response.id)
                this.props.setAppState({ authToken: response.token,
                    user: response.username, 
                    userId: response.id })
                this.setState({
                    username: "",
                    password: "",
                })
                this.props.setAppState({view: "createUserPage"})
            })
            // .catch(err => {
            //     alert("username is taken")
            // })
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
                <h1>Registration</h1>
                <Input type="text" placeholder="username" value={this.state.username} onChange={this.onChange} />
                <Input type="password" placeholder="password" value={this.state.password} onChange={this.onChange} />
                <Button isColor="success" onClick={this.register}>Submit</Button>
            </div>
        )
    }
}

export default Registration