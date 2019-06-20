import React, { Component, Fragment} from 'react';
import { connect } from 'react-redux';
import { postToBlastCreate } from '../../actions/blastActions'
// import { Button, Checkbox, Form, Input } from 'semantic-ui-react'
import { Menu, Segment, TextArea, Form, Input, Button, Modal, Header, Icon, Grid} from 'semantic-ui-react'

class DraftBlast extends Component {

  state = {
    blastLabel: "",
    content: "",
    url: "",
    shortenedLink: "",
    shortenedLinkId: "",
    blastConfirmation: false,
    textBlastSent: false,
    blastData: {}
  }

  handleFormChange = (fieldInputName, event) => {
    switch(fieldInputName){
      case "content":
        this.setState( {...this.state, content: event.target.value} )
      break;
      case "url":
        this.setState( {...this.state, url: event.target.value} )
      break;
      case "name":
        this.setState({...this.state, blastLabel: event.target.value})
      break;
    }
  }

  handleSubmit = () => {
    this.props.submitBlast({
      ...this.state,
      id: this.props.currentUserId
    }, "create")
    .then(data => {
      this.setState({
        ...this.state,
        blastId: data.payload.blastId,
        blastConfirmation: true
      })
    })
  }

//TODO: Validate link before shortening
  handleShortLinkClick = () => {
    if(this.state.url === ""){
      return null
    } else {
      this.props.shortenLink({
        blastLabel: this.state.blastLabel,
        content: this.state.content,
        url: this.state.url
      }, "shorten")
      .then(data => {
        this.setState({
          blasName: data.blastLabel,
          content: data.content,
          url: data.url,
          shortenedLink: data.shortUrl,
          shortenedLinkId: data.shortUrlId
        })
      })//end of promise chain
    }//end of conditional
  }

  handleModuleClick = (action) => {
    switch(action) {
      case "send":
        this.props.submitBlast({
          ...this.state,
          artistId: this.props.currentUserId
        }, "send")
        .then(data => {
          if(data.deliveryStatus == "Success"){
            this.setState( { ...this.state, blastConfirmation: true, textBlastSent: true, blastData: data.smsStatus } )
          } else if(data.deliveryStatus == "Error") {
            this.setState( { ...this.state, blastConfirmation: true, textBlastSent: true, blastData: "Error: No messages delivered" } )
          }
        })
      break;
      case "cancel":
        this.setState({...this.state, blastConfirmation: false})
      break;
    }
  }

  renderBlastDeliveryStatus = () => {
    if(this.state.textBlastSent && this.state.blastData !== "Error: No messages delivered"){
      return <h3>{this.state.blastData.successful} of {this.state.blastData.successful + this.state.blastData.failed} messages were successfully delivered.</h3>
    } else {
      return <h3>{this.state.blastData}</h3>
    }
  }

  renderSendBlastHeader = () => {
    return !this.state.textBlastSent ? <Header textAlign="center" content='Send Blast?' /> : null
  }

  renderSuccessfulBlastContent = () => {
    if(this.state.textBlastSent){
      return (
        <Modal.Content>
          {this.renderBlastDeliveryStatus()}
        </Modal.Content>
      )
    } else {
      return (
        <Fragment>
            <Modal.Actions >
              <Button  color='red' onClick={() => this.handleModuleClick("cancel")}>
                <Icon name='remove' /> No
              </Button>
              <Button onClick={() => this.handleModuleClick("send")} color='green'>
                <Icon name='checkmark' /> Yes
              </Button>
            </Modal.Actions>
        </Fragment>
      )
    }
  }
  //TODO: add pencil icon to blast label, & blast url
  render(){
    return (
      <div id="draft-blast-container">
        <Segment id='blast-container-segment' textAlign='center'>
          <Grid columns={1} centered>
            <div id="draft-blast-form-container">
              <Form size='massive' id="draft-blast-form" onSubmit={this.handleSubmit}>
                <Grid.Row centered>
                  <Input
                  transparent
                  value={this.state.name}
                  placeholder='Blast label'
                  onChange={(event) => this.handleFormChange("name", event)}
                  />
                </Grid.Row>
                <br/>
                <Grid.Row centered>
                  <TextArea
                    value={this.state.content}
                    id="blast-content"
                    placeholder='Blast content...'
                    onChange={(event) => this.handleFormChange("content", event)}
                  />
                </Grid.Row>
                <br/>
                <br/>
                <br/>
                <Grid.Row centered>
                  <Input
                  transparent
                  value={this.state.url}
                  placeholder='Blast url'
                  onChange={(event) => this.handleFormChange("url", event)}
                  />
                  <Button type="button" onClick={this.handleShortLinkClick}>Shorten Link</Button>
                  <Input
                  transparent
                  value={this.state.shortenedLink}
                  placeholder='Shortened url'
                  />
                  <br/>
                </Grid.Row>
                <br/>
                <br/>
                <br/>
                <Grid.Row centered>
                  <Button inverted size="huge" type='submit'>Send Blast</Button>
                </Grid.Row>
              </Form>
            </div>

            <Modal open={this.state.blastConfirmation} basic size='small' closeIcon>
              {this.renderSendBlastHeader()}
              <Segment basic textAlign="center">
              {this.renderSuccessfulBlastContent()}
              </Segment>
            </Modal>
          </Grid>
        </Segment>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitBlast: (blastContent, route)=> dispatch(postToBlastCreate(blastContent, route)),
    shortenLink: (blastContent, route)=> dispatch(postToBlastCreate(blastContent, route)),
    sendblast: (blastContent, route)=> dispatch(postToBlastCreate(blastContent, route))
  }
}

const mapStateToProps = (state) => {
  return {currentUserId: state.sessionsReducer.currentUser.id}
}

export default connect(mapStateToProps, mapDispatchToProps)(DraftBlast)
