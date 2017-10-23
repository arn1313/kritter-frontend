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
    if(!this.props.user) this.props.userFetch()
      .then(() => console.log('__SETTINGS_CONTAINER__', this.props));
  }

  handleToggle() {
    this.setState({editUser: !this.state.editUser});
  }

  render() {
    return (
      <div>
        {utils.renderIf(this.props.auth && !this.props.user,
          <div className="user-form-container">
            <h2>Welcome to Settings</h2>
            <h4>Please configure your account</h4>
            <AuthForm
              buttonText="Create"
              onComplete={this.props.userCreate}/>
          </div>
        )}

    
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
