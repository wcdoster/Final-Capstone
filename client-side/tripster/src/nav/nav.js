import React, { Component } from 'react'

class NavBar extends Component {

    logout = function () {
        this.props.setAppState({ user: "", authToken: "" })
        localStorage.clear()
        this.props.setAppState({view: "login"})
    }.bind(this)

    render() {
        return (
            <div id="navbar">
                <button id="discover" onClick={this.props.setView} >Discover</button>
                <button id="likes" onClick={this.props.setView}>Likes</button>
                <button id="matches" onClick={this.props.setView}>Matches</button>
                <button id="profile" onClick={this.props.setView}>Profile</button>
                <button id="logout" onClick={this.logout} >LogOut</button>
            </div>
        )
    }
}

export default NavBar