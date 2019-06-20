import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Statistic, Header, Segment, Divider } from 'semantic-ui-react'

class GeneralStats extends Component {
  render (){
    return (
      <Fragment>
        <Header textAlign='center'>
          <Statistic inverted size='huge'>
          <Statistic.Value>{this.props.fanCount}</Statistic.Value>
            <Statistic.Label>Fans</Statistic.Label>
          </Statistic>
          <br/>
          <br/>
            <Segment centered inverted style={{"width":"100%"}}>
              <Divider horizontal inverted>F F</Divider>
            </Segment>
          <br/>
          <Statistic inverted size='huge'>
          <Statistic.Value>{this.props.totalBlasts.length}</Statistic.Value>
            <Statistic.Label>blasts sent</Statistic.Label>
          </Statistic>
        </Header>
      </Fragment>
    )
  }

}

const mapStateToProps = (state) => {
    return {
      fanCount: state.sessionsReducer.currentUser.fanbase.count,
      totalBlasts: state.sessionsReducer.currentUser.blasts
    }
}

export default connect(mapStateToProps)(GeneralStats)
// <Button size='massive' onClick={this.handleLogout}>Logout</Button>



//COPY LINK BUTTON/INPUT
// <Input
// action={{ color: 'teal', labelPosition: 'right', icon: 'copy', content: 'Copy' }}
// defaultValue='http://ww.short.url/c0opq'
// value={this.state.shortenedLink}
// placeholder='Shortened url'
// />
