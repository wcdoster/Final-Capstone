import React, { Component } from 'react'
import CreateUserPage from './createUserPage'
import { Box, Input, Select, Button, Label } from 'bloomer'
import './editUserPage.css'
import request from 'superagent'

const CLOUDINARY_UPLOAD_PRESET = 'jcszxosu'
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/tripster/upload';


class EditUserProfile extends Component {

    state = {
        profilePicture:"",
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

    handleImageUpload = function(file) {
        let upload = request.post(CLOUDINARY_UPLOAD_URL)
                            .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                            .field('file', file);
    
        upload.end((err, response) => {
          if (err) {
            console.error(err);
          }
    
          if (response.body.secure_url !== '') {
            this.setState({
              profilePicture: response.body.secure_url
            });
          }
        });
      }.bind(this)

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
            profile_picture: this.state.profilePicture
        }

        console.log(traveler)

        fetch(`http://178.128.184.205/travelers/${this.state.id}/`, {
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


        fetch('http://178.128.184.205/cities/')
            .then(r => r.json())
            .then(response => {
                console.log(response)
                this.setState({
                    cityList: response
                })
            })
        fetch('http://178.128.184.205/nationalities/')
            .then(r => r.json())
            .then(response => {
                console.log(response)
                this.setState({
                    nationalityList: response
                })
            })
        fetch('http://178.128.184.205/questions/')
            .then(r => r.json())
            .then(response => {
                console.log(response)
                this.setState({
                    questionList: response
                })
            })


        const authToken = localStorage.getItem("token")
        fetch(`http://178.128.184.205/loggedin-traveler/`, {
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

    picture = function(e){
        const file = e.target.files[0]
        this.handleImageUpload(file)
    }.bind(this)

    render() {
        return (
            <div>
                <Box className="container">
                <Label>Profile Picture</Label>
                <Input type="file" capture="camera" accept="image/*" id="cameraInput" name="cameraInput" onChange={this.picture}/>
                <Label>First Name</Label>
                <Input className="input" id="first_name" type="text" value={this.state.first_name} placeholder="first name" onChange={this.onChange} />
                <Label>Nationality</Label>
                <Select className="select" id="nationality" onChange={this.onChange} >
                    <option value="" selected disabled hidden>Nationality</option>
                    {this.state.nationalityList.map(p => (
                        <option value={p.url}>{p.name}</option>
                    ))}
                </Select>
                <Label>Age</Label>
                <Input className="input" id="age" type="text" value={this.state.age} placeholder="age" onChange={this.onChange} />
                <Label>Question 1</Label>
                <Select className="select" id="question_1" onChange={this.onChange} >
                    <option value="" selected disabled hidden>Question</option>
                    {this.state.questionList.map(p => (
                        <option value={p.url}>{p.question}</option>
                    ))}
                </Select>
                <Label>Answer</Label>
                <Input className="input" id="answer_1" type="text" value={this.state.answer_1} placeholder="answer" onChange={this.onChange} />
                <Label>Question 2</Label>
                <Select className="select" id="question_2" onChange={this.onChange} >
                    <option value="" selected disabled hidden>Question</option>
                    {this.state.questionList.map(p => (
                        <option value={p.url}>{p.question}</option>
                    ))}
                </Select>
                <Label>Answer</Label>
                <Input className="input" id="answer_2" type="text" value={this.state.answer_2} placeholder="answer" onChange={this.onChange} />
                <Label>Question 3</Label>
                <Select className="select" id="question_3" onChange={this.onChange} >
                    <option value="" selected disabled hidden>Question</option>
                    {this.state.questionList.map(p => (
                        <option value={p.url}>{p.question}</option>
                    ))}
                </Select>
                <Label>Answer</Label>
                <Input className="input" id="answer_3" type="text" value={this.state.answer_3} placeholder="answer" onChange={this.onChange} />
                <Label>City</Label>
                <Select className="select" id="city" onChange={this.onChange} >
                    <option value="" selected disabled hidden>City</option>
                    {this.state.cityList.map(p => (
                        <option value={p.url}>{p.name}</option>
                    ))}
                </Select>
                </Box>
                <Button id="save--profile--button" isColor="success" onClick={this.editUser}>Save</Button>
            </div >
        )
    }
}

export default EditUserProfile