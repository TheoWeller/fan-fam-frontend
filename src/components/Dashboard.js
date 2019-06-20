import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import FanbaseStats from './ArtistViews/FanbaseStats'


import {logout} from '../actions/sessionActions'

class Dashboard extends Component {
  state = { activeItem: 'home' }

  handleLogout = () => {
    this.props.dispatch(this.props.dispatch(logout()))
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  //TODO: add placeholder stats in top cities + states if none exist
  render (){
    return (
        <FanbaseStats/>
    )
  }
}

const mapStateToProps = (state) => {
    return {
      fanCount: state.sessionsReducer.currentUser.fanbase.count,
      topCities: state.sessionsReducer.currentUser.fanbase.top_cities,
      topStates: state.sessionsReducer.currentUser.fanbase.top_states
    }

}

export default connect(mapStateToProps)(Dashboard)

// <Fragment>
//   <Header id="stats-icon-header" inverted textAlign='center' as='h2' icon>
//     <Icon inverted name='signal' />
//       Stats
//   </Header>
// </Fragment>
