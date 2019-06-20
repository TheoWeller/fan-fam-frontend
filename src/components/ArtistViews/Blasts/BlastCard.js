import React from 'react';
import {Card, Icon, Statistic, Grid, Header, Segment, Divider} from 'semantic-ui-react'

const BlastCard = (props) => {
  return (
          <Grid.Column centered width={4}>
            <Segment textAlign='center' inverted>
              <Statistic inverted size='huge' label='Link clicks' value={props.blast.link_click_count} />
              <Statistic inverted size='huge' label='messages delivered' value={props.blast.succesful_messages} />
            </Segment>

            <Header
              textAlign='center'
              inverted
              size='tiny'>
              <Icon size='tiny' inverted name='tag' />
              <Header.Content size='tiny'>{props.blast.label}</Header.Content>
            </Header>

              <Header
                textAlign='center'
                inverted
                size='tiny'>
                <Icon inverted name='time' />
                <Header.Content size='tiny'>Time Sent: {props.blast.time_sent}</Header.Content>
              </Header>

            <Header
              textAlign='center'
              inverted
              size='tiny'>
              <Icon inverted name='calendar times outline' />
              <Header.Content size='tiny'>Date Sent: {props.blast.date_sent}</Header.Content>
            </Header>
            <Segment centered inverted style={{"width":"100%"}}>
              <Divider horizontal inverted>F F</Divider>
            </Segment>
          </Grid.Column>
  )
}
export default BlastCard

// <Statistic size='small' label='Success rate' value={successRate(props.blast.succesful_messages, props.blast.failed_messages)} />
// <Statistic size='small' label='Fans reached' value={props.blast.num_of_fans} />


// props.blast.name
