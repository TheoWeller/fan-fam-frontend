import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Input, Header, Modal, Grid, Segment, Icon, Popup} from 'semantic-ui-react'
import Clipboard from 'clipboard';

import { updateSubscriptionProps } from '../../actions/subscriptionActions'

class Subscribe extends Component {
  state={ slug: "", title: "", editTitle: false, error: false}


  componentDidMount(){
    new Clipboard('#copy-url-btn');
      this.setState({
        ...this.state,
        slug: this.props.subscriptionProps.slug,
        title: this.props.subscriptionProps.title
      })
    }

  handleFormChange = (fieldInputName, event) => {
    switch(fieldInputName){
      case "slug":
        this.setState( {...this.state, slug: event.target.value} )
      break;
      case "title":
        this.setState( {...this.state, title: event.target.value} )
      break;
    }
  }

  //TODO: add error handling to urls that are not unique
  handleFormSubmit = () => {
    this.props.updateSubscriptionProps({
      slug: this.state.slug,
      pageId: this.props.subscriptionProps.pageId,
      title: this.state.title
    })
  }

  handleEditTitle = (action, event) => {
    switch(action) {
      case "edit":
        this.setState({...this.state, editTitle: true})
      break;
      case "done":
        this.setState({...this.state, editTitle: false}, this.handleFormSubmit)
      break;
    }
  }

  zipInput = () => {
    return (
      <Form.Input
      disabled
      transparent
      placeholder='Zipcode'
      value={this.state.zip}
      name="password"
      />
    )
  }

  close = () => {
    this.setState({...this.state, editTitle: false})
  }

  copySubscriptionLink = () => {
    document.execCommand("copy");
  }

  render (){
    const url = `http://fan-fam-backend.herokuapp.com/subscribe/${this.state.slug}`//FOR COMPYING TO CLIPBOARD
    console.log("ARRTIST-SUB", this.state);
    return (
      <Fragment>
      <Modal open={this.state.editTitle} basic size='tiny'>
        <Header textAlign="center"/>
          <Modal.Content>
            <Form size='massive'
            onSubmit={(event) => this.handleEditTitle("done", event)}
            >
              <Form.Field required>
                <Input
                textAlign='center'
                transparent
                value={this.state.title}
                onChange={(event) => this.handleFormChange("title", event)}/>
              </Form.Field>
              <Form.Field>
                <Input transparent value={this.state.slug} placeholder='Enter custom url'name="password" label='http://localhost:3001/subscribe/'  onChange={(event) => this.handleFormChange("slug", event)}/>
              </Form.Field>
              <Segment textAlign='center' id="header-edit-segment">
                <Button
                  size='massive'
                  inverted type='submit'>Cancel
                </Button>
                <Button
                  size='massive'
                  inverted type='button'
                  onClick={() => this.close()}
                >
                  Save
                </Button>
              </Segment>
          </Form>
          </Modal.Content>
      </Modal>
        <div id="user-subscription-copy">
        <Header inverted as='h2' content="My Subscription Page" textAlign='center'/>
          <Button
            size="massive"
            animated='fade'
            icon
            labelPosition='right'
            id="copy-url-btn"
            basic
            inverted
            size="large"
            type='button'
            data-clipboard-text={ url }
            data-clipboard-action="copy"
            onClick={() => this.copySubscriptionLink}
          >
            <Button.Content visible>{`http://localhost:3001/subscribe/${this.props.slug}`}</Button.Content>
            <Button.Content hidden>Click to copy...</Button.Content>
          <Icon name='copy'/>
          </Button>

        </div>
        <div id="artist-subscribe-header">
          <Header
            inverted
            size='huge'
            textAlign='center'
            content={`${this.state.title}`}
          />
          <Segment textAlign='center' id="header-edit-segment">
            <Button
              basic
              size='massive'
              inverted
              onClick={() => this.handleEditTitle("edit", null)}
              content='Edit'
            />
          </Segment>
        </div>
          <div id="fan-subscribe-form-container">
            <Grid>
              <Form size="massive" onSubmit={this.handleFormSubmit} style={{"margin-left": "40%"}}>
                <Grid.Row>
                  <Form.Group>

                    <Form.Field required id="phone-field-1">
                      <Form.Input
                      disabled
                      transparent
                      id="phone-input-1"
                      placeholder='(xxx)'
                      value={this.state.phone1}
                      type="number"
                      step="0.01"
                      />
                    </Form.Field>

                    <Form.Field required id="phone-field-2">
                      <Form.Input
                      disabled
                      transparent
                      id="phone-input-2"
                      placeholder='xxx'
                      value={this.state.phone2}
                      type="number"
                    />
                    </Form.Field>

                    <Form.Field required id="phone-field-3">
                      <Form.Input
                      disabled
                      transparent
                      id="phone-input-3"
                      placeholder='xxxx'
                      value={this.state.phone3}
                      type="number"
                      />
                    </Form.Field>

                  </Form.Group>
                </Grid.Row>
                <Grid.Row>
                  <Form.Field width={6} required>
                  {this.zipInput()}
                  </Form.Field>
                </Grid.Row>
                <Button disabled basic inverted size="large" style={{"margin-top": "4%", "margin-left": "11%"}} type='submit' content="Subscribe"/>
              </Form>
            </Grid>
          </div>
        </Fragment>
    )

  }
}
const mapDispatchToProps = (dispatch) => {
  return {updateSubscriptionProps: (updatedProps)=> dispatch(updateSubscriptionProps(updatedProps))}
}

const mapStateToProps = (state) => {
  console.log("PROPSSSSS", state.sessionsReducer.currentUser.subscriptionProps.slug)
    return {
      subscriptionProps: state.sessionsReducer.currentUser.subscriptionProps,
      slug: state.sessionsReducer.currentUser.subscriptionProps.slug
    }
  }



export default connect(mapStateToProps, mapDispatchToProps)(Subscribe)


// <Form>
//   <Form.Field>
//     <Input
//       transparent
//       label={`http://localhost:3001/subscribe/${this.state.slug}`}
//       onChange={""}
//     />
//   </Form.Field>
// </Form>

// <Popup position='top center' content='Copied!' trigger={} />
