import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Input, Header } from 'semantic-ui-react'
import {LOGIN, login} from '../actions/sessionActions'
import { postToArtistCreate } from '../actions/sessionActions'
import {withRouter} from 'react-router'

class Login extends Component {

  state = {email: "", password: ""}

  handleFormChange = (fieldInputName, event) => {
    switch(fieldInputName){
      case "email":
        this.setState( {...this.state, email: event.target.value} )
      break;
      case "password":
        this.setState( {...this.state, password: event.target.value} )
      break;
    }
  }

  dispatchLogin = () => {
    this.props.fetchArtistCreate(login(this.state.email, this.state.password))
      .then(data => {
        console.log("LOGIN DATA", data);
        if (data.errors) {
          alert('please enter the right info')
        } else {
          this.props.history.push('dashboard')
        }
      })
  }

  render (){
    return (
      <div>
        <div id="login-header">
          <Header
            inverted
            size='huge'
            textAlign='center'
            content="FAN FAM"
          />
          </div>
        <Form id="login-form" size="massive" inverted onSubmit={this.dispatchLogin} >
          <Form.Field>
            <Input transparent
            size='large'
            placeholder='Email'
            value={this.state.email}
            name="email"
            onChange={(event) => this.handleFormChange("email", event)}
          />
          </Form.Field>
          <Form.Field>
            <Input transparent
            size='large'
            placeholder='Password'
            type="password"
            value={this.state.password}
            name="password"
            onChange={(event) => this.handleFormChange("password", event)}
          />
          </Form.Field>
          <Button basic inverted style={{"margin-top":"5%"}} size='huge' type='submit'>Login</Button>
        </Form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {fetchArtistCreate: (newArtist)=> dispatch(postToArtistCreate(newArtist, "login"))}
}

export default withRouter(connect(null, mapDispatchToProps)(Login))
