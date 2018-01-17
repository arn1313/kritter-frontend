import React from 'react';
import AuthForm from '../auth-form';
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux';
import PopupDialogForm from '../PopupDialogForm'

import * as utils from '../../lib/utils';
import { signupRequest, loginRequest, userFetchRequest } from '../../action/auth-actions';
import { stringify } from 'querystring';
import './_landing-container.scss';


class LandingContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: true,
    };


  }

  close() {
    this.setState({ showModal: !this.state.showModal });
    // this.props.history.replace('/home');
  }


  render() {


    let { params } = this.props.match;
    let handleComplete = params.auth === 'login' ?
      this.props.login :
      this.props.signup;



    return (
      <section>
        <div className="login-form">


          <AuthForm
            auth={params.auth}
            userFetchRequest={this.props.userFetchRequest}
            onComplete={handleComplete}
            buttonText={'submit'} />
          {/* <PopupDialogForm
            openNow={'instantLogin'}
            onComplete={this.props.signup}
            buttonText={'Login'}
            userFetchRequest={this.props.userFetchRequest}
            auth='signup' /> */}
          <Link to="/"><h2 className="login-link">Whoops, I actually want to sign up!</h2></Link>
        </div>
      </section>
    );
  }
}

let mapStateToProps = () => ({});
let mapDispatchToProps = dispatch => ({
  signup: user => dispatch(signupRequest(user)),
  login: user => dispatch(loginRequest(user)),
  userFetchRequest: () => dispatch(userFetchRequest()),
});


export default connect(mapStateToProps, mapDispatchToProps)(LandingContainer);
