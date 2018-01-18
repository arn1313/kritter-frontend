import React from 'react';
import ReactDOM from 'react-dom';
import scrollToComponent from 'react-scroll-to-component';
import './_heroContainer.scss';
import img from '../../img/Kritter.png';
import AuthForm from '../auth-form';
import SignUpForm from '../sign-up-form'
import { signupRequest, loginRequest, userFetchRequest } from '../../action/auth-actions';
import { stringify } from 'querystring';
import { connect } from 'react-redux';
import * as utils from '../../lib/utils';
import { Link } from 'react-router-dom';
import '../auth-form/_auth-form.scss';


class Hero extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {

    return (
      <section style={{ textAlign: 'center' }}>

        <div >
          {/* <h1 className="land-head">Kritter</h1> */}
          <h2 className="create">Create a New Account</h2>
          {/* <AuthForm
            className="signup"
            auth='signup'
            onComplete={this.props.signup}
            buttonText={'submit'}
            userFetchRequest={this.props.userFetchRequest} /> */}
          <SignUpForm
            userFetchRequest={this.props.userFetchRequest}
            onComplete={this.props.signup}
            buttonText={'submit'} />
        </div>

        <div className="six columns login-thing">

          {/* <h1 className="land-head2">dflgjdfkg</h1> */}
          <Link to="/welcome/login"><h2 className="login-link">...or Login</h2></Link>
        </div>
      </section>


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
  userFetchRequest: () => dispatch(userFetchRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Hero);
