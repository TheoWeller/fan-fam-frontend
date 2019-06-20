import React, { Component} from 'react';
import { Grid, Header, Segment, Statistic} from 'semantic-ui-react'
import { connect } from 'react-redux';


class FanbaseStats extends Component {

  renderStats = (stats) => {
    const arrayOfStats = Object.entries(stats)
     return arrayOfStats.map(stat => {
       return (
         <Segment horizontal style={{"border":"0px"}}>
           <Grid.Column>
            <Statistic inverted size='huge' label={stat[0]} value={stat[1]} />
           </Grid.Column>
         </Segment>

       )
     })
   }


  render(){
    return (
      <div id="fanbase-stats">
        <Grid centered stackable columns={2}>
          <Segment className="stat-segment" style={{"border":"0px"}}>
            <Header id="top-cities-header" inverted as='h2'>TOP STATES</Header>
            {this.renderStats(this.props.stats.top_states)}
          </Segment>
        </Grid>
      </div>


    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

const mapStateToProps = (state) => {
  return {stats: state.sessionsReducer.currentUser.fanbase}
}

export default connect(mapStateToProps, mapDispatchToProps)(FanbaseStats)
