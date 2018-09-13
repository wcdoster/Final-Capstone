import React, { Component } from 'react'

class UserPage extends Component {
    state = {
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
                    console.log(result)
                    return result.name
                })
        }
    }.bind(this)

    componentDidMount() {
        const authToken = localStorage.getItem("token")
        fetch(`http://127.0.0.1:8000/loggedin-traveler/`, {
            method: 'GET',
            headers: {
                "authorization": `Token ${authToken}`
            }
        })
            .then(r => r.json())
            .then(response => {
                console.log(response)
                const j = response[0]
                this.setState({
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



    render() {
        return (
            <div>
                <button id="editUserPage" onClick={this.props.setView}>Edit Profile</button>
                <h2>{this.state.first_name}</h2>
                <h4>{this.state.nationality}</h4>
                <h4>{this.state.city}</h4>
                <h4>{this.state.age}</h4>
                <p>{this.state.question_1}</p>
                <p>{this.state.answer_1}</p>
                <p>{this.state.question_2}</p>
                <p>{this.state.answer_2}</p>
                <p>{this.state.question_3}</p>
                <p>{this.state.answer_3}</p>
            </div >
        )
    }
}

export default UserPage