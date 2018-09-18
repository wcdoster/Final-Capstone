import React, { Component } from 'react'
import { Label, Button, Input, Select } from 'bloomer'
import request from 'superagent'

const CLOUDINARY_UPLOAD_PRESET = 'jcszxosu'
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/tripster/upload';

class CreateUserPage extends Component {

    state = {
        profile_picture:"",
        picture_1:"",
        picture_2:"",
        picture_3:"",
        first_name: "",
        nationality: {},
        answer_1: "",
        answer_2: "",
        answer_3: "",
        city: {},
        question_1: {},
        question_2: {},
        question_3: {},
        age: "",
        cityList: [],
        nationalityList: [],
        questionList: [],
    }

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
    }

    onChange = function (evt) {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }.bind(this)

    saveUser = function () {

        const traveler = {
            user: `http://178.128.184.205/users/${this.props.userId}/`,
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
            profile_picture: this.state.profile_picture,
            picture_1: this.state.picture_1,
            picture_2: this.state.picture_1,
            picture_3: this.state.picture_1
        }

        console.log(traveler)

        fetch(`http://178.128.184.205/post-traveler/`, {
            method: 'POST',
            body: JSON.stringify(traveler),
            headers: {
                "Content-type": "application/json",
                'Accept': 'application/json, text/plain',
                "authorization": `Token ${this.props.authToken}`
            }
        })
            .then(() => {
                this.props.setAppState({ view: "discover" })
            })
    }.bind(this)

    handleImageUpload = function (file) {
        let upload = request.post(CLOUDINARY_UPLOAD_URL)
            .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
            .field('file', file);

        upload.end((err, response) => {
            if (err) {
                console.error(err);
            }

            if (response.body.secure_url !== '') {
                this.setState({
                    profile_picture: response.body.secure_url
                });
            }
        });
    }.bind(this)

    picture = function (e) {
        const file = e.target.files[0]
        this.handleImageUpload(file)
    }.bind(this)

    render() {
        return (
            <div className="container--div">
                <Label>Profile Picture</Label>
                <Input type="file" 
                // capture="camera" 
                accept="image/*" id="cameraInput" name="cameraInput" onChange={this.picture} />
                <Input id="first_name" type="text" value={this.state.first_name} placeholder="first name" onChange={this.onChange} />
                <Select id="nationality" onChange={this.onChange} >
                    <option value="" selected disabled hidden>Nationality</option>
                    {this.state.nationalityList.map(p => (
                        <option value={p.url}>{p.name}</option>
                    ))}
                </Select>
                <Input id="age" type="text" value={this.state.age} placeholder="age" onChange={this.onChange} />
                <Select id="question_1" onChange={this.onChange} >
                    <option value="" selected disabled hidden>Question</option>
                    {this.state.questionList.map(p => (
                        <option value={p.url}>{p.question}</option>
                    ))}
                </Select>
                <Input id="answer_1" type="text" value={this.state.answer_1} placeholder="answer" onChange={this.onChange} />
                <Select id="question_2" onChange={this.onChange} >
                    <option value="" selected disabled hidden>Question</option>
                    {this.state.questionList.map(p => (
                        <option value={p.url}>{p.question}</option>
                    ))}
                </Select>
                <Input id="answer_2" type="text" value={this.state.answer_2} placeholder="answer" onChange={this.onChange} />
                <Select id="question_3" onChange={this.onChange} >
                    <option value="" selected disabled hidden>Question</option>
                    {this.state.questionList.map(p => (
                        <option value={p.url}>{p.question}</option>
                    ))}
                </Select>
                <Input id="answer_3" type="text" value={this.state.answer_3} placeholder="answer" onChange={this.onChange} />
                <Select id="city" onChange={this.onChange} >
                    <option value="" selected disabled hidden>City</option>
                    {this.state.cityList.map(p => (
                        <option value={p.url}>{p.name}</option>
                    ))}
                </Select>
                <Button isColor="success" onClick={this.saveUser}>Register</Button>
            </div >
        )
    }
}

export default CreateUserPage
