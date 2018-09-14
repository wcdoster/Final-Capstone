import React, { Component } from 'react'

class MatchUserPage extends Component {

    state={
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
        fetch(`http://127.0.0.1:8000/loggedin-traveler/`,
            {
                method: 'GET',
                headers: {
                    "authorization": `Token ${authToken}`
                }
            })
            .then(r => r.json())
            .then(j => {
                const result = j[0]
                this.setState({currentUser: result })
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
                this.setState({ traveler: travelerObject })
            })
    }.bind(this)

    viewChat = function(){
        this.props.setAppState({view: 'chat', chatUser:this.state.traveler.url})
    }.bind(this)

    render() {
        return(
            <div>
                <h2>{this.state.traveler.first_name}</h2>
                <h4>{this.state.traveler.nationality}</h4>
                <h4>{this.state.traveler.city}</h4>
                <h4>{this.state.traveler.age}</h4>
                <p>{this.state.traveler.question_1}</p>
                <p>{this.state.traveler.answer_1}</p>
                <p>{this.state.traveler.question_2}</p>
                <p>{this.state.traveler.answer_2}</p>
                <p>{this.state.traveler.question_3}</p>
                <p>{this.state.traveler.answer_3}</p>
                <button onClick={this.viewChat}>Chat</button>
                <button onClick={this.remove}>Remove</button>
            </div>
        )
    }
}

export default MatchUserPage