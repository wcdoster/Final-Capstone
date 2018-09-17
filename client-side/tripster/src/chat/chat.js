import React, { Component } from 'react'
import { Input, Button, Box } from 'bloomer'
import './chat.css'

class Chat extends Component {

    state = {
        message: "",
        currentUser: {},
        chatList: [],
        time: new Date()
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
                this.getChat()
            })

        fetch(this.props.chatUser, {
            method: 'GET',
            headers: {
                "authorization": `Token ${authToken}`
            }
        })
            .then(r => r.json())
            .then(result => {
                this.setState({ chatUser: result })
            })

    }

    getChat = function () {
        fetch(`http://127.0.0.1:8000/traveler-chat/`, {
            method: 'GET',
            headers: {
                "authorization": `Token ${this.props.authToken}`
            }
        })
            .then(r => r.json())
            .then(result => {
                const chatList = []
                // debugger
                result.forEach(chat => {
                    if ((chat.sender === this.state.currentUser.url || chat.receiver === this.state.currentUser.url) && (chat.sender === this.props.chatUser || chat.receiver === this.props.chatUser)) {
                        chatList.push(chat)
                    }
                    this.setState({ chatList: chatList })
                })
            })
    }.bind(this)


    onChange = function (evt) {
        const stateToChange = {}
        stateToChange[evt.target.placeholder] = evt.target.value
        this.setState(stateToChange)
    }.bind(this)

    submitMessage = function () {
        const chat = { sender: this.state.currentUser.url, receiver: this.props.chatUser, message: this.state.message }
        fetch(`http://127.0.0.1:8000/traveler-chat/`, {
            method: 'POST',
            body: JSON.stringify(chat),
            headers: {
                "Content-type": "application/json",
                'Accept': 'application/json, text/plain',
                "authorization": `Token ${this.props.authToken}`
            }
        })
            .then(() => {
                console.log(this.state.message)
                this.setState({ message: "" })
                this.getChat()
            })
    }.bind(this)

    messageClass = function (chat) {
        if (chat.sender === this.state.currentUser.url) {
            return "sender"
        } else {
            return "receiver"
        }
    }.bind(this)

    renderChat = function () {
        if (this.state.chatList.length > 0) {
            return (
                <div>
                    {
                        this.state.chatList.map(chat => (
                            <div>
                                <h4 className={this.messageClass(chat)}>{chat.message}</h4>
                            </div>
                        ))
                    }
                </div>
            )
        }else{
            return(<h3>Start The Chat!</h3>)
        }
    }.bind(this)

    render() {
        return (
            <div>
                <h1>Your Chat with</h1>
                <Box id="chat--box">
                    {this.renderChat()}
                </Box>
                <div id="message--box">
                    <Input id="textBox" type="text" placeholder="message" onChange={this.onChange} value={this.state.message} />
                    <Button id="chat--submit" isColor="success" onClick={this.submitMessage}>Submit</Button>
                </div>
            </div >
        )
    }
}

export default Chat