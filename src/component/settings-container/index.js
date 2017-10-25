import React from 'react';
import {connect} from 'react-redux';
import * as utils from '../../lib/utils';
import AuthForm from '../auth-form';
import {userFetchRequest, userCreateRequest, userUpdateRequest} from '../../action/auth-actions';

class SettingsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editUser: false,
      username: '',
      bio: '',
    };
    this.handleToggle = this.handleToggle.bind(this);
  }

  componentWillMount() {
    if(!this.props.user) this.props.userFetch();
  }

  handleToggle() {
    this.setState({editUser: !this.state.editUser});
  }

  render() {
    return (
      <div>

        <div className="user-form-container">
          <h2>Welcome to Settings</h2>
          <div>
            <h3>{this.props.username}</h3>
            <p>{this.props.email}</p>
          </div>
          <h4>Please configure your account</h4>
          <AuthForm
            buttonText="Update"
            onComplete={this.props.userUpdate}
            user={this.props.user}/>
        </div>

      </div>
    );
  }
}

let mapStateToProps = state => ({
  user: state.user,
  auth: state.auth,
});

let mapDispatchToProps = dispatch => ({
  userCreate: user => dispatch(userCreateRequest(user)),
  userFetch: () => dispatch(userFetchRequest()),
  userUpdate: user => dispatch(userUpdateRequest(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer);
