import React, { Component } from 'react'
import { Button, Box } from 'bloomer'
import './discover.css'

class Discover extends Component {

    state = {
        currentUser: {},
        city: "",
        travelerList: [],
        traveler: {},
        authToken: ""
    }

    componentDidMount() {
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
                const users = []
                const likeList = []
                const matchList = []
                const existingList = []
                const discoverList = []
                return fetch(`http://127.0.0.1:8000/loggedin-traveler/`, {
                    method: 'GET',
                    headers: {
                        "authorization": `Token ${authToken}`
                    }
                })
                    .then(r => r.json())
                    .then(response => {
                        console.log(response)
                        const j = response[0]
                        const travelerUrl = j.url
                        const travelerCity = j.city
                        this.setState({ userId: j.user, travelerUrl: j.url })
                        fetch(`http://127.0.0.1:8000/traveler-like/`, {
                            method: 'GET',
                            headers: {
                                "authorization": `Token ${authToken}`
                            }
                        })
                            .then(r => r.json())
                            .then(likes => {
                                console.log(likes)
                                likes.forEach(like => {
                                    const thisLike = {}
                                    if (travelerUrl === like.sender || travelerUrl === like.receiver) {
                                        existingList.push(like.sender)
                                        existingList.push(like.receiver)
                                    }
                                })
                                fetch(`http://127.0.0.1:8000/traveler-remove/`, {
                                    method: 'GET',
                                    headers: {
                                        "authorization": `Token ${this.state.authToken}`
                                    }
                                })
                                    .then(r => r.json())
                                    .then(removes => {
                                        removes.forEach(remove => {
                                            const thisMatch = {}
                                            if (travelerUrl === remove.sender || travelerUrl === remove.receiver) {
                                                existingList.push(remove.sender)
                                                existingList.push(remove.receiver)
                                            }
                                        })
                                        fetch(`http://127.0.0.1:8000/traveler-match/`, {
                                            method: 'GET',
                                            headers: {
                                                "authorization": `Token ${this.state.authToken}`
                                            }
                                        })
                                            .then(r => r.json())
                                            .then(matches => {
                                                matches.forEach(match => {
                                                    const thisMatch = {}
                                                    if (travelerUrl === (match.traveler_1 || match.traveler_2)) {
                                                        existingList.push(match.traveler_1)
                                                        existingList.push(match.traveler_2)
                                                    }
                                                })
                                                fetch(`http://127.0.0.1:8000/travelers/`)
                                                    .then(r => r.json())
                                                    .then(response => {
                                                        response
                                                        console.log(response)
                                                        response.forEach(person => {
                                                            if (existingList.indexOf(person.url) === -1 && person.url !== travelerUrl && person.city === travelerCity) {
                                                                discoverList.push(person)
                                                            }
                                                        })
                                                        this.setState({ discoverList: discoverList })
                                                        const thisUser = j
                                                        this.setState({ city: thisUser.city, currentUser: thisUser })
                                                        const travelerList = discoverList
                                                        this.setState({ travelerList: travelerList })
                                                        if (travelerList.length > 0) {
                                                            this.makeTraveler(travelerList[0])
                                                            console.log(travelerList)
                                                        }
                                                    })
                                            })
                                    })
                            })
                    })
            })
    }


    like = function () {
        const travelerLike = { sender: this.state.currentUser.url, receiver: this.state.traveler.url }

        fetch('http://127.0.0.1:8000/traveler-like/', {
            method: 'POST',
            body: JSON.stringify(travelerLike),
            headers: {
                "Content-type": "application/json",
                'Accept': 'application/json, text/plain',
                "authorization": `Token ${this.state.authToken}`
            }
        })
            .then(() => {
                const newTravelerList = this.state.travelerList
                newTravelerList.shift()
                this.setState({ travelerList: newTravelerList, traveler: {} })
                if (newTravelerList.length > 0) {
                    this.makeTraveler(this.state.travelerList[0])
                }
            })
    }.bind(this)

    remove = function () {
        const travelerRemove = { sender: this.state.currentUser.url, receiver: this.state.traveler.url }

        fetch('http://127.0.0.1:8000/traveler-remove/', {
            method: 'POST',
            body: JSON.stringify(travelerRemove),
            headers: {
                "Content-type": "application/json",
                'Accept': 'application/json, text/plain',
                "authorization": `Token ${this.state.authToken}`
            }
        })
        .then(()=>{
            const newTravelerList = this.state.travelerList
                newTravelerList.shift()
                this.setState({ travelerList: newTravelerList, traveler: {} })
                if (newTravelerList.length > 0) {
                    this.makeTraveler(this.state.travelerList[0])
                }
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
                travelerObject.profile_picture = traveler.profile_picture
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

    renderUser = function () {
        if (this.state.travelerList.length > 0) {
            return (
                <div id='container' className="container--div">
                    <h1>Discover</h1>
                    <Box id='discover--box'>
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
                    <Button isColor="success" onClick={this.like}>Like</Button>
                    <Button isColor="danger" onClick={this.remove}>Remove</Button>
                    </Box>
                </div>
            )
        } else {
            return (
                <div>
                    <h1>Discover</h1>
                    <h2>No More Travelers to View</h2>
                    <h2>Check Back Later</h2>
                </div>
            )
        }
    }.bind(this)

    render() {
        return (
            <div>
                {this.renderUser()}
            </div >
        )
    }
}

export default Discover