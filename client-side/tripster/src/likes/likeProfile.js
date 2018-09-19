import React, { Component } from 'react'
import { Button, Box } from 'bloomer'
import './likeProfile.css'

class LikeProfile extends Component {

    state = {
        traveler: {},
        currentUser: {}
    }

    componentDidMount() {
        const url = this.props.viewingUserUrl
        fetch(url)
            .then(r => r.json())
            .then(response => {
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

    match = function () {
        debugger
        const likeId = this.props.likeProfileId
        const match = { traveler_1: this.state.currentUser.url, traveler_2: this.state.traveler.url }
        fetch(`http://178.128.184.205/traveler-match/`, {
            method: 'POST',
            body: JSON.stringify(match),
            headers: {
                "Content-type": "application/json",
                'Accept': 'application/json, text/plain',
                "authorization": `Token ${this.props.authToken}`
            }
        })
            .then(() => {
                fetch(`http://178.128.184.205/traveler-like/${likeId}/`, {
                    method: 'DELETE',
                    headers: {
                        "Authorization": `Token ${this.props.authToken}`
                    }
                })
                    .then(() => {
                        this.props.setAppState({ view: 'likes' })
                    })
            })
    }.bind(this)

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
                travelerObject.profile_picture = traveler.profile_picture
                travelerObject.age = traveler.age
                travelerObject.answer_1 = traveler.answer_1
                travelerObject.answer_2 = traveler.answer_2
                travelerObject.answer_3 = traveler.answer_3
                travelerObject.url = traveler.url
                travelerObject.id = traveler.id
                this.setState({ traveler: travelerObject })
            })
    }.bind(this)

    remove = function () {
        const likeId = this.props.likeProfileId
        const remove = { sender: this.state.currentUser.url, receiver: this.state.traveler.url }
        fetch(`http://178.128.184.205/traveler-like/${likeId}/`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Token ${this.props.authToken}`
            }
        })
        .then(()=>{
            debugger
            fetch('http://178.128.184.205/traveler-remove/', {
            method: 'POST',
            body: JSON.stringify(remove),
            headers: {
                "Content-type": "application/json",
                'Accept': 'application/json, text/plain',
                "authorization": `Token ${this.state.authToken}`
            }
        })
            .then(() => {
                this.props.setAppState({ view: 'likes' })
            })
        })
    }.bind(this)

    render() {
        return (
            <div className="container--div">
                <Box id='like--profile--box'>
                    <div id="main--info--like">
                        <img id="like--profile--image" src={this.state.traveler.profile_picture} />
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
                    <Button isColor="success" onClick={this.match}>Match</Button>
                    <Button isColor="danger" onClick={this.remove}>Remove</Button>
                </Box>
            </div>
        )
    }
}

export default LikeProfile