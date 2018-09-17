import React, { Component } from 'react'
import { Button  } from 'bloomer'
import './nav.css'

class NavBar extends Component {

    logout = function () {
        this.props.setAppState({ user: "", authToken: "" })
        localStorage.clear()
        this.props.setAppState({view: "login"})
    }.bind(this)

    render() {
        return (
            <div id="navbar">
                <Button className="nav--comp" isColor="info" isOutlined id="discover" onClick={this.props.setView} >Discover</Button>
                <Button className="nav--comp" isColor="info" isOutlined id="likes" onClick={this.props.setView}>Likes</Button>
                <Button className="nav--comp" isColor="info" isOutlined id="matches" onClick={this.props.setView}>Matches</Button>
                <Button className="nav--comp" isColor="info" isOutlined id="profile" onClick={this.props.setView}>Profile</Button>
                <Button id="logout" isColor="info" isOutlined id="logout" onClick={this.logout} >LogOut</Button>
            </div>
        )
    }
}

export default NavBar