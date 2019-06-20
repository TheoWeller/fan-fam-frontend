import React, { Component} from 'react';
import { Grid, Header, Segment, Statistic} from 'semantic-ui-react'
import { connect } from 'react-redux';


class TopCities extends Component {

  renderStats = (stats) => {
    const arrayOfStats = Object.entries(stats)
     return arrayOfStats.map(stat => {
       return (
         <Segment transparent horizontal style={{"border":"0px"}}>
           <Grid.Column>
            <Statistic size='huge' inverted label={stat[0]} value={stat[1]} />
           </Grid.Column>
         </Segment>

       )
     })
   }


  render(){
    return (
      <div id="fanbase-stats">
        <Grid centered stackable columns={2}>
          <Segment transparent className="stat-segment" style={{"border":"0px"}}>
            <Header id="top-cities-header" inverted as='h2'>TOP CITIES</Header>
            {this.renderStats(this.props.stats.top_cities)}
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

export default connect(mapStateToProps, mapDispatchToProps)(TopCities)
