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




class Hero extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  // componentDidMount() {
  //   const elem = ReactDOM.findDOMNode(this.refs.hello);
  //   if (elem) {
  //     elem.scrollIntoView(false);
  //   }
  // }

  render() {

    // let {params} = this.props.match;
    // let handleComplete = params.auth === 'login' ?
    //   this.props.login  :
    //   this.props.signup;

    // let redirect = path => this.props.history.replace(path);

    return (
      <div className="landing">
        <div className="landing-row">
          <div className="six columns please">
            <AuthForm
              className="signup"
              auth='signup'
              onComplete={this.props.signup}
              buttonText={'submit'}/>
          </div>
          <img className="raccoon" src={img} />
        </div>
        <Link to="/welcome/login"><h1>Login</h1></Link>

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
