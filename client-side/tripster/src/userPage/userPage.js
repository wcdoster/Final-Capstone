import React, { Component } from 'react'
import { Button, Box } from 'bloomer'
import './userPage.css'

class UserPage extends Component {
    state = {
        profile_picture: "",
        cityList: [],
        questionList: [],
        nationalityList: [],
        first_name: "",
        nationality: "",
        answer_1: "",
        answer_2: "",
        answer_3: "",
        city: "",
        question_1: "",
        question_2: "",
        question_3: "",
        age: "",
        nationalityUrl: "",
        cityUrl: "",
        question_1Url: "",
        question_2Url: "",
        question_3Url: ""
    }

    findValue = function (url) {
        if (url) {
            return fetch(url)
                .then(r => r.json())
                .then(result => {
                    debugger
                    return result.name
                })
        }
    }.bind(this)

    componentDidMount() {
        const authToken = localStorage.getItem("token")
        fetch(`http://178.128.184.205/loggedin-traveler/`, {
            method: 'GET',
            headers: {
                "authorization": `Token ${authToken}`
            }
        })
            .then(r => r.json())
            .then(response => {
                const j = response[0]
                this.setState({
                    profile_picture: j.profile_picture,
                    first_name: j.first_name,
                    nationalityUrl: j.nationality,
                    answer_1: j.answer_1,
                    answer_2: j.answer_2,
                    answer_3: j.answer_3,
                    cityUrl: j.city,
                    question_1Url: j.question_1,
                    question_2Url: j.question_2,
                    question_3Url: j.question_3,
                    age: j.age,
                })

                fetch(this.state.cityUrl)
                    .then(r => r.json())
                    .then(response => {
                        this.setState({
                            city: response.name
                        })
                    })
                fetch(this.state.question_1Url)
                    .then(r => r.json())
                    .then(response => {
                        this.setState({
                            question_1: response.question
                        })
                    })
                fetch(this.state.question_2Url)
                    .then(r => r.json())
                    .then(response => {
                        this.setState({
                            question_2: response.question
                        })
                    })
                fetch(this.state.question_3Url)
                    .then(r => r.json())
                    .then(response => {
                        this.setState({
                            question_3: response.question
                        })
                    })
                fetch(this.state.nationalityUrl)
                    .then(r => r.json())
                    .then(response => {
                        this.setState({
                            nationality: response.name
                        })
                    })
            })
    }

    logout = function () {
        this.props.setAppState({ user: "", authToken: "" })
        localStorage.clear()
        this.props.setAppState({view: "login"})
    }.bind(this)



    render() {
        return (
            <div className="container--div">
                <h1>Profile</h1>
                <Box id="user--page--box">
                    <div id="main--profile">
                        <img id='profile--picture' src={this.state.profile_picture} />
                        <div id="information">
                            <h3>{this.state.first_name}</h3>
                            <h4>{this.state.nationality}</h4>
                            <h4>{this.state.city}</h4>
                            <h4>{this.state.age}</h4>
                        </div>
                    </div>
                    <p>{this.state.question_1}</p>
                    <p>{this.state.answer_1}</p>
                    <p>{this.state.question_2}</p>
                    <p>{this.state.answer_2}</p>
                    <p>{this.state.question_3}</p>
                    <p>{this.state.answer_3}</p>
                </Box>
                <div id="user--page--buttons">
                <Button isColor="success" id="editUserPage" onClick={this.props.setView}>Edit Profile</Button>
                <Button isColor="warning" id="logout" onClick={this.logout}>Logout</Button>
                </div>
            </div >
        )
    }
}

export default UserPage