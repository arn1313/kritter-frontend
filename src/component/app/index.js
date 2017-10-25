import React from 'react';
import './_app.scss';
import Navbar from '../navbar';
import {connect} from 'react-redux';
import * as utils from '../../lib/utils';
import {tokenSetRequest} from '../../action/auth-actions';
import LandingContainer from '../landing-container';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';
import SettingsContainer from '../settings-container';
import DashboardContainer from '../dashboard-container';
import {userFetchRequest} from '../../action/auth-actions';
import {postFetchAllRequest} from '../../action/post-actions';
// import GalleryContainer from '../gallery-container';
import Hero from '../hero-container';

class App extends React.Component {


  componentWillMount() {
    let token = utils.cookieFetch('X-Kritter-Token');
    if(token) {
      this.props.tokenSet(token)
        .then(() => this.props.userFetch())
        .then(result => console.log('After userFetch', result.body))
        .then(() => this.props.postFetch())
        
        .catch(console.error);
    }
  }

  render() {
    
    return (
      <div className="application">
        <BrowserRouter>
          <div>
            <Navbar 
              user={this.props.user}/>
            {utils.renderIf(!this.props.auth,
              <Hero />
            )} 
            <Route path="/welcome/:auth" component={LandingContainer}/>
            <Route exact path="/settings" component={() => this.props.auth ? <SettingsContainer/> : <Redirect to="/home" />}/>
            <Route exact path="/home" component={() => this.props.auth ? <DashboardContainer/> : <Redirect to="/home" />}/>
            {/* <Route exact path="/gallery" component={() => this.props.auth ? <GalleryContainer/> : <Redirect to="/home" />}/> */}
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
//test

let mapStateToProps = state => ({
  user: state.user,
  auth: state.auth,
  post: state.post,
});

let mapDispatchToProps = dispatch => ({
  tokenSet: token => dispatch(tokenSetRequest(token)),
  userFetch: () => dispatch(userFetchRequest()),
  postFetch: () => dispatch(postFetchAllRequest()),
  
});

export default connect(mapStateToProps, mapDispatchToProps)(App);