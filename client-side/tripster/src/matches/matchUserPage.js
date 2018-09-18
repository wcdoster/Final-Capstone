import React, { Component } from 'react'
import { Button, Box } from 'bloomer'
import './matchUserPage.css'

class MatchUserPage extends Component {

    state = {
        currentUser: {},
        traveler: {}
    }

    componentDidMount() {
        const url = this.props.viewingUserUrl
        fetch(url)
            .then(r => r.json())
            .then(response => {
                console.log(response)
                const traveler = this.makeTraveler(response)
                // this.setState({traveler: traveler})
            })
        const authToken = localStorage.getItem('token')
        this.setState({ authToken: authToken })
        fetch(`http://178.128.184.205/loggedin-traveler/`,
            {
                method: 'GET',
                headers: {
                    "authorization": `Token ${authToken}`
                }
            })
            .then(r => r.json())
            .then(j => {
                const result = j[0]
                this.setState({ currentUser: result })
            })
    }

    makeTraveler = function (traveler) {
        const travelerObject = {}
        fetch(traveler.city)
            .then(r => r.json())
            .then(response => {
                travelerObject.city = response.name
            })
        fetch(traveler.question_1)
            .then(r => r.json())
            .then(response => {
                travelerObject.question_1 = response.question
            })
        fetch(traveler.question_2)
            .then(r => r.json())
            .then(response => {
                travelerObject.question_2 = response.question
            })
        fetch(traveler.question_3)
            .then(r => r.json())
            .then(response => {
                travelerObject.question_3 = response.question
            })
        fetch(traveler.nationality)
            .then(r => r.json())
            .then(response => {
                travelerObject.nationality = response.name
                travelerObject.first_name = traveler.first_name
                travelerObject.age = traveler.age
                travelerObject.answer_1 = traveler.answer_1
                travelerObject.answer_2 = traveler.answer_2
                travelerObject.answer_3 = traveler.answer_3
                travelerObject.url = traveler.url
                travelerObject.id = traveler.id
                travelerObject.profile_picture = traveler.profile_picture
                this.setState({ traveler: travelerObject })
            })
    }.bind(this)

    viewChat = function () {
        this.props.setAppState({ view: 'chat', chatUser: this.state.traveler.url })
    }.bind(this)

    render() {
        return (
            <div className="container--div">
                <Box id='match--profile--box'>
                    <div id="main--info--match">
                        <img id="match--profile--image" src={this.state.traveler.profile_picture} />
                        <div>
                            <h3>{this.state.traveler.first_name}</h3>
                            <h4>{this.state.traveler.nationality}</h4>
                            <h4>{this.state.traveler.city}</h4>
                            <h4>{this.state.traveler.age}</h4>
                        </div>
                    </div>
                    <p>{this.state.traveler.question_1}</p>
                    <p>{this.state.traveler.answer_1}</p>
                    <p>{this.state.traveler.question_2}</p>
                    <p>{this.state.traveler.answer_2}</p>
                    <p>{this.state.traveler.question_3}</p>
                    <p>{this.state.traveler.answer_3}</p>
                    <Button isColor="primary" onClick={this.viewChat}>Chat</Button>
                    <Button isColor="danger" onClick={this.remove}>Remove</Button>
                </Box>
            </div>
        )
    }
}

export default MatchUserPage