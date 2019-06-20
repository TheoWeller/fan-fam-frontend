import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Input } from 'semantic-ui-react'
import { signUp } from '../actions/sessionActions'
import { postToArtistCreate } from '../actions/sessionActions'

export class ArtistSignup extends Component {

  state = {email: "", username: "", password: "", phone: ""}

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
      case "phone":
      this.setState( {...this.state, phone: event.target.value} )
      break;
    }
  }

  signupForm = () => {
    // console.log("STATE", this.state);
    return (
      <Form id="artis-signup-form" inverted onSubmit={this.handleSubmit}>
    <Form.Field>
      <Input transparent icon='mail outline' iconPosition='left' size='huge' placeholder='Email' value={this.state.email} name="email" onChange={(event) => this.handleFormChange("email", event)}/>
    </Form.Field>
    <Form.Field>
      <Input fluid transparent iconPosition='left' icon='user outline' size='huge' placeholder='Username' value={this.state.username} name="username" onChange={(event) => this.handleFormChange("username", event)}/>
    </Form.Field>
    <Form.Field>
      <Input transparent iconPosition='left' icon='lock' size='huge' placeholder='Password' type="password" value={this.state.password} name="password"  onChange={(event) => this.handleFormChange("password", event)}/>
    </Form.Field>
    <Form.Field>
      <Input transparent iconPosition='left' icon='phone' size='huge' placeholder='Phone' value={this.state.phone} name="phone" onChange={(event) => this.handleFormChange("phone", event)}/>
    </Form.Field>
    <Button type='submit'>Submit</Button>
  </Form>
    )
  }

  dispatchSignup = () => {
    this.props.dispatch(signUp(this.state.email, this.state.username, this.state.password, this.state.phone))
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const newArtist = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      phone: this.state.phone
    }
    this.props.fetchArtistCreate(newArtist)
    this.setState({email: "", username: "", password: "", phone: ""})
  }

  render(){
    return (

      this.signupForm()
    )
  }

}

const mapDispatchToProps = (dispatch) => {
  return {fetchArtistCreate: (newArtist)=> dispatch(postToArtistCreate(newArtist, "signup"))}
}



export default connect(null, mapDispatchToProps)(ArtistSignup);
