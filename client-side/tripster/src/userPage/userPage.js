import React, { Component } from 'react'

class UserPage extends Component {
    state = {
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
    }

    componentDidMount() {
        fetch(`http://127.0.0.1:8000/travelers?user=${this.props.userUrl}`)
            .then(r => r.json())
            .then(response => {
                console.log(response)
                // this.setState({
                //     first_name: "",
                //     nationality: "",
                //     answer_1: "",
                //     answer_2: "",
                //     answer_3: "",
                //     city: "",
                //     question_1: "",
                //     question_2: "",
                //     question_3: "",
                //     age: "",
                // })
            })
    }

    render() {
        return (
            <div>
                <button id="editUserPage" onClick={this.props.setView}>Edit Profile</button>
                <h2>{this.state.first_name}</h2>
                <h4>{this.state.nationality}</h4>
                <h4>{this.state.age}</h4>
                <h4>{this.state.city}</h4>
                <p>{this.state.question_1}</p>
                <p>{this.state.answer_1}</p>
                <p>{this.state.question_2}</p>
                <p>{this.state.answer_2}</p>
                <p>{this.state.question_3}</p>
                <p>{this.state.answer_3}</p>
            </div>
        )
    }
}

export default UserPage