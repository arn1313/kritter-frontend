import React from 'react';
import AuthForm from '../auth-form';
import { connect } from 'react-redux';
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
    // this.redirect = this.redirect.bind(this)

  }

  close() {
    this.setState({ showModal: !this.state.showModal });
    // this.props.history.replace('/home');
  }

  // redirect(path) {
  //   this.props.history.replace(path)
  // }
  render() {


    let { params } = this.props.match;
    let handleComplete = params.auth === 'login' ?
      this.props.login :
      this.props.signup;

    // let redirect = path => (this.props.history.replace(path));


    return (
      <section>
        <div className="login-form">

          {/* <h1> Please {params.auth}</h1> */}
          <AuthForm
            auth={params.auth}
            userFetchRequest={this.props.userFetchRequest}
            onComplete={handleComplete}
            buttonText={'submit'} />
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
