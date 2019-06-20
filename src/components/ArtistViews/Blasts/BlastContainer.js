import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Card, Header, Icon, Grid} from 'semantic-ui-react'
import BlastCard from './BlastCard'

class BlastContainer extends Component {
  //If there are blasts to render..
  conditionallyRenderBlastCards = () => {
    if(this.props.blasts){
      return this.renderBlastCards(this.props.blasts)
    }
  }

  renderNoBlastsMessage = () => {
    if(this.props.blasts.length === 0){
      return (

          <div id="no-blast-message">
            <Header textAlign='center' inverted as='h2' icon>
              <Icon inverted name='exclamation' />
              No blasts yet
            </Header>
          </div>

      )
    }
  }

  renderBlastCards = (blasts) => {
    return blasts.reverse().map(blast => {
      return (
        <BlastCard blast={blast}/>
      )
    })
  }

  render(){
    //TODO: list blasts by most recent--Filter by most successful?
    return (
      <div id="blast-card-container">
      {this.renderNoBlastsMessage()}
        <Grid padded inverted columns={2} divided>
          {this.conditionallyRenderBlastCards()}
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.sessionsReducer.currentUser.token,
    blasts: state.sessionsReducer.currentUser.blasts
  }
}

export default connect(mapStateToProps)(BlastContainer)
