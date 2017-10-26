import React from 'react';
import './_navbar.scss';
import * as utils from '../../lib/utils';
import {tokenSet} from '../../action/auth-actions';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import {tokenDelete, logoutUser} from '../../action/auth-actions';
import {stringify} from 'querystring';


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
                <img className="kritter-logo" src="http://www.clker.com/cliparts/Q/0/a/r/h/S/paw-print-hi.png" height="50px" width="50px"/>
                <span><Link to="/home"><h1>kritter</h1></Link></span>
              </div>
              <div className="nav-header">
                <img className="nav-logo" src="http://via.placeholder.com/50x50" />
                <span><h4>sdfkgjskfgjlskjdfgkjsgf{this.props.user.username}</h4> <br />
                  <span className="nav-settings"><Link to="/settings"><h5>settings</h5></Link><h5 onClick={this.handleLogout}><Link to="/home">logout</Link></h5></span></span>
              </div>
            </header>
          </div>
          :
          undefined
        }
        <ul>
          {this.props.auth ?
            // undefined
      <div>
        {/* <li onClick={this.handleLogout}><Link to="/home">Logout</Link></li>
        <li><Link to="/home">Dashboard</Link></li>
        <li><Link to="/settings">Settings</Link></li> */}
        <li><Link to="/gallery">KritterPub</Link></li>
      </div>
            :
            <div>
              <li><Link to="/welcome/signup">Signup</Link></li>
              <li><Link to="/welcome/login">Login</Link></li>
            </div>
          }
        </ul>
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
