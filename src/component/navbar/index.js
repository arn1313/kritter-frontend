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
      <header>
        {this.props.auth && this.props.profile ? 
          <div className="profile-header">
            <h2>Welcome {this.props.profile.username}</h2>
            <img src={this.props.profile.avatar} style={{'width': '15%', 'border': '1px solid grey'}}/>
          </div>
          :
          undefined
        }
        <nav>
          <ul>
            {this.props.auth ?
              <div>
                <li onClick={this.handleLogout}><Link to="/home">Logout</Link></li> 
                <li><Link to="/home">Dashboard</Link></li> 
                <li><Link to="/settings">Settings</Link></li> 
                <li><Link to="/gallery">Public Gallery</Link></li> 
              </div>
              :
              <div> 
                <li><Link to="/welcome/signup">Signup</Link></li>
                <li><Link to="/welcome/login">Login</Link></li>
              </div>
            }
          </ul>
        </nav>
      </header >
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
