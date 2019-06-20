import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Input, Header, Modal, Segment, Grid, Transition} from 'semantic-ui-react'
import { postToSubscriptionCreate } from '../../actions/subscriptionActions'
class Subscribe extends Component {
  state={ phone1: "", phone2: "", phone3: "", zip: "", slug: "", payload: {}, zipError: false, visible: false }

  /****************************************************************
  FETCHES
  ****************************************************************/

  componentDidMount(){
    const slug = this.props.match.params.slug
    if(slug){
      this.setState({...this.state, slug, visible: true })
      this.fetchArtistShowPage(slug)
    } else {
      this.fetchArtistShowPage(this.props.currentUser.username)
    }
  }

  fetchArtistShowPage = (slug) => {
    fetch(`http://localhost:3000/api/v1/subscribe/${slug}`)
    .then(r => r.json())
    .then(data => {
      this.setState({...this.state, payload: data.payload})
    })
  }

  handleFormSubmit = () => {
    const isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(this.state.zip);
    const phone = "1" + `${this.state.phone1 + this.state.phone2 + this.state.phone3}`

    if(isValidZip){
      this.props.postToSubscriptionCreate({phone: phone, zip: this.state.zip, slug: this.state.slug})
    } else {
      this.setState({...this.state, zip: "", zipError: true})
    }
  }


  /****************************************************************
  FORM HELPERS
  ****************************************************************/
  handleFormChange = (fieldInputName, event) => {
    switch(fieldInputName){
      case "phone1":
      if(event.target.value.length === 3){
        this.setState( {...this.state, phone1: event.target.value}, () => {
          this.focusOnNextField("2")
        })
      } else {
        this.setState( {...this.state, phone1: event.target.value} )
      }
      break;
      case "phone2":
        if(event.target.value.length === 3){
          this.setState( {...this.state, phone2: event.target.value}, () => {
            this.focusOnNextField("3")
          })
        } else {
          this.setState( {...this.state, phone2: event.target.value} )
        }
      break;
      case "phone3":
      if(event.target.value.length <= 4){
        this.setState( {...this.state, phone3: event.target.value} )
      }
      break;
      case "zip":
        this.setState( {...this.state, zip: event.target.value} )
      break;
    }
  }

  focusOnNextField = (id) => {
    document.getElementById(`phone-input-${id}`).focus()
  }

  handleZipcodeError = () => {
    return !this.state.zipError ? this.zipInput() : this.zipInputError()
  }

  zipInputError = () => {
    return (
      <Form.Input
      transparent
      error
      placeholder='Invalid zipcode'
      value={this.state.zip}
      name="password"
      onChange={(event) => this.handleFormChange("zip", event)}/>)
  }

  zipInput = () => {
    return (
      <Form.Input
      transparent
      placeholder='Zipcode'
      value={this.state.zip}
      name="password"
      onChange={(event) => this.handleFormChange("zip", event)}/>)
  }

  render (){
    return (
    <Fragment>
      <Modal open={this.props.isSubscribed} basic size='small'>
        <Header
          textAlign="center"
          content='Thank you for subscribing'
          />
      </Modal>

      <div id="fan-subscribe-header">
      <Transition visible={this.state.visible} animation='fade' duration={500}>
        <Header
          size='huge'
          textAlign='center'
          content={this.state.payload.title && `${this.state.payload.title}`}
        />
      </Transition>
      </div>
        <div id="fan-subscribe-form-container">
          <Grid>
            <Form size="massive" onSubmit={this.handleFormSubmit} style={{"margin-left": "40%"}}>
              <Grid.Row>
                <Form.Group>

                  <Form.Field required id="phone-field-1">
                    <Form.Input
                    transparent
                    id="phone-input-1"
                    placeholder='(xxx)'
                    value={this.state.phone1}
                    type="number"
                    step="0.01"
                    onChange={(event) => this.handleFormChange("phone1", event)}/>
                  </Form.Field>

                  <Form.Field required id="phone-field-2">
                    <Form.Input
                    transparent
                    id="phone-input-2"
                    placeholder='xxx'
                    value={this.state.phone2}
                    type="number"
                    onChange={(event) => this.handleFormChange("phone2", event)}/>
                  </Form.Field>

                  <Form.Field required id="phone-field-3">
                    <Form.Input
                    transparent
                    id="phone-input-3"
                    placeholder='xxxx'
                    value={this.state.phone3}
                    type="number"
                    onChange={(event) => this.handleFormChange("phone3", event)}/>
                  </Form.Field>

                </Form.Group>
              </Grid.Row>
              <Grid.Row>
                <Form.Field width={6} required>
                  {this.handleZipcodeError()}
                </Form.Field>
              </Grid.Row>
              <Button basic inverted size="massive" style={{"margin-top": "4%", "margin-left": "8%"}} type='submit' content="Subscribe"/>
            </Form>
          </Grid>
        </div>
      </Fragment>
    )
  }
}
const mapDispatchToProps = (dispatch) => {
  return {postToSubscriptionCreate: (newArtist)=> dispatch(postToSubscriptionCreate(newArtist))}
}

const mapStateToProps = (state) => {
  return {currentUser: state.sessionsReducer.currentUser, isSubscribed: state.subscriptionReducer.isSubscribed}
}

export default connect(mapStateToProps, mapDispatchToProps)(Subscribe)
