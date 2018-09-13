import React, { Component } from 'react'
import CreateUserPage from './createUserPage'

class EditUserProfile extends Component {

    state = {
        id: "",
        user: "",
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

    editUser = function() {
        const traveler = {
            user: this.state.user,
            first_name: this.state.first_name,
            nationality: this.state.nationality,
            city: this.state.city,
            age: this.state.age,
            question_1: this.state.question_1,
            answer_1: this.state.answer_1,
            question_2: this.state.question_2,
            answer_2: this.state.answer_2,
            question_3: this.state.question_3,
            answer_3: this.state.answer_3,
        }

        console.log(traveler)

        fetch(`http://127.0.0.1:8000/travelers/${this.state.id}/`, {
            method: 'PUT',
            body: JSON.stringify(traveler),
            headers: {
                "Content-type": "application/json",
                // 'Accept': 'application/json, text/plain',
                "authorization": `Token ${this.props.authToken}`
            }
        })
        .then(()=>{
            this.props.setAppState({view:'profile'})
        })
    }.bind(this)

    onChange = function (evt) {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }.bind(this)

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


        fetch('http://127.0.0.1:8000/cities/')
            .then(r => r.json())
            .then(response => {
                console.log(response)
                this.setState({
                    cityList: response
                })
            })
        fetch('http://127.0.0.1:8000/nationalities/')
            .then(r => r.json())
            .then(response => {
                console.log(response)
                this.setState({
                    nationalityList: response
                })
            })
        fetch('http://127.0.0.1:8000/questions/')
            .then(r => r.json())
            .then(response => {
                console.log(response)
                this.setState({
                    questionList: response
                })
            })


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
                    id: j.id,
                    user: j.user,
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
                <input id="first_name" type="text" value={this.state.first_name} placeholder="first name" onChange={this.onChange} />
                <select id="nationality" onChange={this.onChange} >
                    <option value="" selected disabled hidden>Nationality</option>
                    {this.state.nationalityList.map(p => (
                        <option value={p.url}>{p.name}</option>
                    ))}
                </select>
                <input id="age" type="text" value={this.state.age} placeholder="age" onChange={this.onChange} />
                <select id="question_1" onChange={this.onChange} >
                    <option value="" selected disabled hidden>Question</option>
                    {this.state.questionList.map(p => (
                        <option value={p.url}>{p.question}</option>
                    ))}
                </select>
                <input id="answer_1" type="text" value={this.state.answer_1} placeholder="answer" onChange={this.onChange} />
                <select id="question_2" onChange={this.onChange} >
                    <option value="" selected disabled hidden>Question</option>
                    {this.state.questionList.map(p => (
                        <option value={p.url}>{p.question}</option>
                    ))}
                </select>
                <input id="answer_2" type="text" value={this.state.answer_2} placeholder="answer" onChange={this.onChange} />
                <select id="question_3" onChange={this.onChange} >
                    <option value="" selected disabled hidden>Question</option>
                    {this.state.questionList.map(p => (
                        <option value={p.url}>{p.question}</option>
                    ))}
                </select>
                <input id="answer_3" type="text" value={this.state.answer_3} placeholder="answer" onChange={this.onChange} />
                <select id="city" onChange={this.onChange} >
                    <option value="" selected disabled hidden>City</option>
                    {this.state.cityList.map(p => (
                        <option value={p.url}>{p.name}</option>
                    ))}
                </select>
                <input type="submit" value="submit" onClick={this.editUser} />
            </div >
        )
    }
}

export default EditUserProfile