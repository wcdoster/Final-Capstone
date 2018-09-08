import React, { Component } from 'react'
import CreateUserPage from './createUserPage'

class EditUserProfile extends Component {

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
                <CreateUserPage authToken={this.props.authToken} />
            </div>
        )
    }
}

export default EditUserProfile