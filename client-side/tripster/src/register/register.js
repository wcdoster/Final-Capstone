import React, { Component } from 'react'
import { Box, Button, Field, Input } from 'bloomer'
import './register.css'

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
        fetch(`http://178.128.184.205/${route}/`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json",
                'Accept': 'application/json, text/plain'
            }
        })
            .then(r => r.json())
            .then(response => {
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
    }.bind(this)

    register = function () {
        const user = Object.assign({}, this.state);
        this.postAuth("register", user)
    }.bind(this)

    backButton = function(){
        this.props.setAppState({view:'login'})
    }.bind(this)

    render() {
        return (
            <div>
                <h1>Welcome to Tripster</h1>
                <Box id="register--box">
                <h2 id="register--text">Registration</h2>
                <Input type="text" placeholder="username" value={this.state.username} onChange={this.onChange} />
                <Input type="password" placeholder="password" value={this.state.password} onChange={this.onChange} />
                <div id='register--buttons'>
                <Button isColor="success" onClick={this.register}>Submit</Button>
                <Button isColor="primary" onClick={this.backButton}>Back</Button>
                </div>
                </Box>
            </div>
        )
    }
}

export default Registration