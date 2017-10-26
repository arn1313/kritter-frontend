import React from 'react';
import AuthForm from '../auth-form';
import {connect} from 'react-redux';
import * as utils from '../../lib/utils';
import {Button} from 'react-bootstrap';
import {signupRequest, loginRequest} from '../../action/auth-actions';
import {stringify} from 'querystring';

class LandingContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showModal: true,
    };
    this.close = this.close.bind(this);
  }

  close() {
    this.setState({ showModal: !this.state.showModal });
    this.props.history.replace('/home');
  }
  render() {


    let {params} = this.props.match;
    let handleComplete = params.auth === 'login' ?
      this.props.login  : 
      this.props.signup;
    
    let redirect = path => this.props.history.replace(path);


    return (
      <section>
        <div className="static-modal">
          <h1> Please {params.auth}</h1>
          <AuthForm 
            auth={params.auth}
            redirect={redirect}
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
});


export default connect(mapStateToProps, mapDispatchToProps)(LandingContainer);
