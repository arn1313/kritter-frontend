import React from 'react';
import ReactDOM from 'react-dom';
import scrollToComponent from 'react-scroll-to-component';
import './_heroContainer.scss';
import img from '../../img/Kritter.png';
import AuthForm from '../auth-form';
import {signupRequest, loginRequest} from '../../action/auth-actions';
import {stringify} from 'querystring';
import {connect} from 'react-redux';
import * as utils from '../../lib/utils';
import {Link} from 'react-router-dom';
import '../auth-form/_auth-form.scss';


class Hero extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  render() {

    return (
      <div className="landing">
        <div className="landing-row">
          <div className="six columns signup-form">
            <h1 className="land-head">Kritter</h1>
            <h5>please kill me or login please do this</h5>
            <AuthForm
              className="signup"
              auth='signup'
              onComplete={this.props.signup}
              buttonText={'submit'}/>
          </div>
          {/* <div className="wrap">
          <div className="raccoon-img">
            <img className="u-max-width" src={img} />
          </div>
        </div> */}
          <div className="six columns login-thing">
            <Link to="/welcome/login"><h5>or you could login you asshole</h5></Link>
          </div>
        </div>

      </div>

    );
  }
}

let mapStateToProps = state => ({
  user: state.user,
  auth: state.auth,
  post: state.post,
});
let mapDispatchToProps = dispatch => ({
  signup: user => dispatch(signupRequest(user)),
  login: user => dispatch(loginRequest(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Hero);
