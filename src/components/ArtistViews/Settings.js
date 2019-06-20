import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Input, Grid, Icon, Header } from 'semantic-ui-react'
// import { Menu, Segment } from 'semantic-ui-react'
import { postToArtistCreate } from '../../actions/sessionActions'

class Settings extends Component {
  state = {email: "", username: "", password: "", phone: "", newPassword: ""}

  componentDidMount(){
    fetch('http://fan-fam-backend.herokuapp.com/api/v1/artist/settings', {
      headers: {
        Authenticate: this.props.currentUserToken
      }
    })
    .then(r => r.json())
    .then(data => {
      this.setState({
        ...this.state,
        email: data.email,
        phone: data.phone,
        username: data.username
      })
    })
  }


  handleFormChange = (fieldInputName, event) => {
    switch(fieldInputName){
      case "email":
      this.setState( {...this.state, email: event.target.value} )
      break;
      case "username":
      this.setState( {...this.state, username: event.target.value} )
      break;
      case "password":
      this.setState( {...this.state, password: event.target.value} )
      break;
      case "new-password":
      this.setState( {...this.state, newPassword: event.target.value} )
      break;
      case "phone":
      this.setState( {...this.state, phone: event.target.value} )
      break;
    }
  }

  //TODO: Save title when module save buttton is clicked
  handleSubmit = (event) => {
    event.preventDefault()
    // this.props.update(newArtist)
  }

  userSettingsForm = () => {
    // console.log("STATE", this.state);
    return (
      <div id="settings-container">
        <Header inverted as='h2' icon textAlign='center'>
          <Icon inverted name='settings' />
            Account Settings
        </Header>
        <br/>
        <br/>
        <br/>
      <Grid centered columns={1}>
          <Form size="massive" id="settings-form" center onSubmit={this.handleSubmit}>
            <Form.Field>
              <Input transparent
              icon='mail outline'
              iconPosition='left'
              size='huge'
              placeholder='Email'
              value={this.state.email}
              name="email"
              onChange={(event) => this.handleFormChange("email", event)}
            />
            </Form.Field>
            <Form.Field>
              <Input fluid
              transparent
              iconPosition='left'
              icon='user outline'
              size='huge'
              placeholder='Username'
              value={this.state.username}
              name="username"
              onChange={(event) => this.handleFormChange("username", event)}
            />
            </Form.Field>
            <Form.Field>
              <Input transparent
              iconPosition='left'
              icon='lock'
              size='huge'
              placeholder='Password'
              type="password"
              value={this.state.password}
              name="password"
              onChange={(event) => this.handleFormChange("password", event)}
            />
            </Form.Field>
            <Form.Field>
              <Input transparent
              iconPosition='left'
              icon='lock'
              size='huge'
              placeholder='New password'
              type="password"
              value={this.state.Newpassword}
              name="password"
              onChange={(event) => this.handleFormChange("new-password", event)}
            />
            </Form.Field>
            <Form.Field>
              <Input transparent
              iconPosition='left'
              icon='phone'
              size='huge'
              placeholder='Phone'
              value={this.state.phone}
              name="phone"
              onChange={(event) => this.handleFormChange("phone", event)}
            />
            </Form.Field>
            <Button
              style={{"margin-top":"10%"}}
              basic
              inverted
              size="huge"
              type='submit'
              >
              Save
            </Button>
          </Form>
        </Grid>
      </div>
    )
  }

  render(){
    return (
      this.userSettingsForm()
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    update: (newArtist)=> dispatch(postToArtistCreate(newArtist, "update")),
    getArtistData: (newArtist)=> dispatch(postToArtistCreate(newArtist, "setttings"))
  }
}

const mapStateToProps = (state) => {
  return {currentUserToken: state.sessionsReducer.currentUser.token}
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
