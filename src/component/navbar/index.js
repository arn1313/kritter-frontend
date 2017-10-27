import React from 'react';
import './_navbar.scss';
import * as utils from '../../lib/utils';
import {tokenSet} from '../../action/auth-actions';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import {tokenDelete, logoutUser} from '../../action/auth-actions';
import {stringify} from 'querystring';


import pawPrint from '../../img/paw-print-hi.png';
import questionMark from '../../img/question-mark-xxl.png';


class Navbar extends React.Component {
  constructor(props){
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(){
    localStorage.clear();
    utils.cookieDelete('X-Kritter-Token');
    this.props.tokenDelete();
    this.props.logoutProfile();

  }

  render() {
    return (
      <div>
        {this.props.auth && this.props.user ?
          <div className="container">
            <header className="header-world">
              <div className="kritter-header">
                <img className="kritter-logo" src={pawPrint} height="50px" width="50px"/>
                <span><Link to="/home"><h1>kritter</h1></Link></span>
              </div>
              <div className="nav-header">
                <img className="post-logo" style={{'width': '50px', 'height': '50px'}} src={this.props.user.avatar ? this.props.user.avatar : questionMark} />
                <span><Link to="/settings"><h4>{this.props.user.username}</h4></Link> <br />
                  <Link className="settings-link" to="/settings">settings</Link>    <Link onClick={this.handleLogout} to="/home">logout</Link></span>
              </div>
            </header>
          </div>
          :
          // <Login />
          undefined
        }
      </div >
    );
  }
}

let mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
});

let mapDispatchToProps = dispatch => ({
  tokenDelete: () => dispatch(tokenDelete()),
  tokenSet: token => dispatch(tokenSet(token)),
  logoutUser: () => dispatch(logoutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
