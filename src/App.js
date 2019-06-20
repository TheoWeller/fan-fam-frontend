//LIBRARIES
import React from 'react';
import {Component, Fragment} from 'react';
import {Switch, Route, Redirect, withRouter } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import { connect } from 'react-redux';
import {Loader, Dimmer, Segment} from 'semantic-ui-react'

//COMPONENTS & VARIABLES
import './App.css';
import { postToArtistCreate } from './actions/sessionActions'
import Dashboard from './components/Dashboard'
import Subscribe from './components/FanView/Subscribe'
import SubscriptionPage from './components/ArtistViews/SubscriptionPage'
import Settings from './components/ArtistViews/Settings'
import BlastContainer from './components/ArtistViews/Blasts/BlastContainer'
import DraftBlast from './components/ArtistViews/DraftBlast'
import Navbar from './components/Navbar'
import Home from './components/Home'
import {autoLogin} from './actions/sessionActions'
import { postToBlastCreate } from './actions/blastActions'



class App extends Component {

  state = { unAuthenticated: false, redirectLink: null }

  componentDidMount(){
    this.checkForToken()
  }


  renderSomething = () => {
    if(this.props.isAuthenticated){
      return <Navbar />
    }
  }

//TODO: handle url formatting
//TODO: make route accessable when user's are logged in
  handleRedirectFromTextBlasts = (uniqueKey, route) => {
    this.props.redirect({ key: uniqueKey.replace(/^\/|\/$/g, '') }, "redirect")
    .then(data => {
      const url = data.url.replace(/^\/|\/$/g, '')
      window.location.href = `http://${url}`
    })
    return null
  }

  checkForToken = () => {
    const token = localStorage.token
    if (token) {
      this.props.fetchArtistCreate(autoLogin(token))
    } else {
      this.setState({unAuthenticated: true})
    }
  }

  render(){
    //TODO: Fix route
    // console.log("CURRENT USER IN APP.JS", this.props);
    if (this.props.doneLoading || this.state.unAuthenticated) {
      if(!this.props.isAuthenticated || !this.props.currentUser){
        return (
          <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/:slug' render={() => (
            <div>
              {this.handleRedirectFromTextBlasts(this.props.location.pathname, "redirect")}
            </div>
          )}/>
          <Route path='/subscribe/:slug' component={Subscribe}/>
          <Redirect to={'/'}/>
          </Switch>
        )
      } else {
        return (
          <Fragment>
            {this.renderSomething()}
            <Switch>
              <Route path='/subscribe/edit' component={SubscriptionPage}/>
              <Route path='/settings' component={Settings}/>
              <Route path='/blasts/draft' component={DraftBlast}/>
              <Route exact path='/blasts' component={BlastContainer}/>
              <Route path='/dashboard' component={Dashboard}/>
            </Switch>
          </Fragment>
        );
      }
    } else {
      // show a spinner
      return (
            <Dimmer id="loading-dimmer" active blurring>
              <Loader size='massive'/>
            </Dimmer>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.sessionsReducer.authenticated,
    currentUser: state.sessionsReducer.currentUser,
    doneLoading: !state.sessionsReducer.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchArtistCreate: (token)=> dispatch(postToArtistCreate(token, "auto_login")),
    redirect: (blastContent, route)=> dispatch(postToBlastCreate(blastContent, route))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
//
//
