import React, { Component} from 'react';
import { Grid, Segment, Statistic, Button, Icon, Header, Divider} from 'semantic-ui-react'
import { connect } from 'react-redux';
import Clipboard from 'clipboard';

import TopCities from './StatComponents/TopCities'
import TopStates from './StatComponents/TopStates'
import GeneralStats from './StatComponents/GeneralStats'

class FanbaseStats extends Component {

  componentDidMount(){
    new Clipboard('#copy-url-btn');
  }

  renderStats = (stats, category) => {
    const arrayOfStats = Object.entries(stats)
     return arrayOfStats.map(stat => {
       return (
         <Segment horizontal >
           <Grid.Column>
            <Statistic size='small' label={stat[0]} value={stat[1]} />
           </Grid.Column>
         </Segment>
       )
     })
   }

  render(){
    const url = `http://fan-fam-backend.herokuapp.com/subscribe/${this.props.slug}`//FOR COMPYING TO CLIPBOARD
    return (
      <div id="fanbase-stats">
        <Grid centered divided inverted columns='equal'>
          <Grid.Column>
            <TopCities/>
          </Grid.Column>
          <Grid.Column width={4} id="fanbase-stats-middle-column">
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
                  <Button.Content visible>{`http://fan-fam-backend.herokuapp.com/subscribe/${this.props.slug}`}</Button.Content>
                  <Button.Content hidden>Click to copy...</Button.Content>
                <Icon name='copy'/>
                </Button>
                <Segment centered inverted style={{"width":"100%"}}>
                  <Divider horizontal inverted>F F</Divider>
                </Segment>
            </div>
            <GeneralStats/>
          </Grid.Column>
          <Grid.Column>
            <TopStates/>
          </Grid.Column>
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
  return {
    stats: state.sessionsReducer.currentUser.fanbase,
    slug: state.sessionsReducer.currentUser.subscriptionProps.slug
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FanbaseStats)
