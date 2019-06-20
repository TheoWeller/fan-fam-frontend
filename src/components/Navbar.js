import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link, withRouter} from 'react-router-dom'
import { Menu, Segment, Button, Checkbox, Form, Input, Grid } from 'semantic-ui-react'
import {  } from 'semantic-ui-react'

import {LOGOUT, logout} from '../actions/sessionActions'

class Dashboard extends Component {
  state = { activeItem: 'dashboard' }

  componentDidMount(){
    switch(this.props.location.pathname){
      case "/blasts/draft":
        this.setState({activeItem: 'draft blast'})
      break;
      case "/dashboard":
        this.setState({activeItem: 'dashboard'})
      break;
      case "/subscribe/edit":
        this.setState({activeItem: 'subscribe'})
      break;
      case "/blasts":
        this.setState({activeItem: 'blasts'})
      break;
      case "/settings":
        this.setState({activeItem: 'settings'})
      break;
      default:
        this.setState({activeItem: 'dashboard'})
      break;
    }
  }

  handleLogout = () => {
    this.props.dispatch(this.props.dispatch(logout()))
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
  }

  render (){
     const { activeItem } = this.state
    return (
      <Segment inverted id="nav-segment">
        <Menu compact inverted pointing secondary size='massive' id="nav-bar-grid">
          <Grid columns='equal' style={ {"width":"100%"} }>

            <Grid.Column textAlign='center'>
              <Link to='/dashboard'>
                <Menu.Item
                style={ { "display": "inline-block" } }
                name='dashboard'
                active={activeItem === 'dashboard'}
                onClick={this.handleItemClick}
                />
              </Link>
            </Grid.Column>

            <Grid.Column textAlign='center'>
              <Link to='/blasts'>
                <Menu.Item
                style={ { "display": "inline-block" } }
                name='blasts'
                active={activeItem === 'blasts'}
                onClick={this.handleItemClick}
                />
              </Link>
            </Grid.Column>

            <Grid.Column textAlign='center'>
              <Link to='/blasts/draft'>
                <Menu.Item
                style={ { "display": "inline-block" } }
                name='draft blast'
                active={activeItem === 'draft blast'}
                onClick={this.handleItemClick} />
              </Link>
            </Grid.Column>

            <Grid.Column textAlign='center'>
              <Segment centered id="nav-logo-segment">
                <Menu.Item
                 id="header-logo"
                 style={ { "display": "inline-block" } }
                 header>FAN FAM</Menu.Item>
               </Segment>
            </Grid.Column>

            <Grid.Column textAlign='center'>
                <Link to='/subscribe/edit'>
                  <Menu.Item
                  style={ { "display": "inline-block" } }
                  name='subscribe'
                  active={activeItem === 'subscribe'}
                  onClick={this.handleItemClick}
                  />
                </Link>
            </Grid.Column>

            <Grid.Column textAlign='center'>
                <Link to='/settings'>
                  <Menu.Item
                  style={ { "display": "inline-block" } }
                  name='settings'
                  active={activeItem === 'settings'}
                  onClick={this.handleItemClick}/>
                </Link>
            </Grid.Column>
            <Grid.Column textAlign='center'>
              <Link to='/'>
                <Menu.Item
                  style={ { "display": "inline-block" } }
                  name='logout'
                  active={activeItem === 'logout'}
                  onClick={this.handleLogout}
                />
            </Link>
            </Grid.Column>
          </Grid>
        </Menu>
      </Segment>
    )
  }
}

export default withRouter(connect()(Dashboard))
// <Button size='massive' onClick={this.handleLogout}>Logout</Button>
