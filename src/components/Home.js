import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Button, Grid, Modal, Divider } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

import Login from './Login'
import ArtistSignup from './ArtistSignup'
// import {LOGOUT, logout} from '../actions/sessionActions'

class Home extends Component {
  state = { open: false }

  show = dimmer => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })

  render(){
      const { open, dimmer } = this.state

    // console.log('HOME PROPS: ', this.props)
    return(
         <Grid container relaxed='very' stackable divided='vertically'>
          <Grid.Row centered>
            <Login />
          </Grid.Row>
          <Segment centered inverted style={{"width":"100%"}}>
            <Divider horizontal inverted>Or</Divider>
          </Segment>
           <Grid.Row centered>
             <Modal trigger={<Button inverted size='massive' onClick={this.show('blurring')}>Signup</Button>} dimmer={dimmer} open={open} onClose={this.close}>
              <Modal.Header>Signup</Modal.Header>
                <Modal.Content>
                  <ArtistSignup />
                </Modal.Content>
              </Modal>
           </Grid.Row>
         </Grid>
    )
  }
}

export default connect()(Home)

// <Button content='Sign up' icon='signup' size='big' />

// <Header size='large'>
//  <Icon name='signup' />
//  <Header.Content>Create Account</Header.Content>
// </Header>
