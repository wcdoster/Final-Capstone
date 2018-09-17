import React, { Component } from 'react'
import { Button  } from 'bloomer'
import './nav.css'

class NavBar extends Component {

    render() {
        return (
            <div id="navbar">
                <Button className="nav--comp" isColor="info" isOutlined id="discover" onClick={this.props.setView} >Discover</Button>
                <Button className="nav--comp" isColor="info" isOutlined id="likes" onClick={this.props.setView}>Likes</Button>
                <Button className="nav--comp" isColor="info" isOutlined id="matches" onClick={this.props.setView}>Matches</Button>
                <Button className="nav--comp" isColor="info" isOutlined id="profile" onClick={this.props.setView}>Profile</Button>
            </div>
        )
    }
}

export default NavBar