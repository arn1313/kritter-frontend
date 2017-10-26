import React from 'react';
import {connect} from 'react-redux';
import * as utils from '../../lib/utils';
import AuthForm from '../auth-form';
import {userFetchRequest, userCreateRequest, userUpdateRequest} from '../../action/auth-actions';
import {postFetchAllRequest} from '../../action/post-actions';
import PostItem from '../post-item';
import Aside from '../aside';

class SettingsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editUser: false,
      username: '',
      bio: '',
    };
    this.handleEdit = this.handleEdit.bind(this);
  }


  handleEdit() {
    this.setState({editUser: !this.state.editUser});
  }

  render() {
    let filtered = this.props.post.filter(post => post.ownerId === this.props.user._id);
    return (
      <div className="container">
        <Aside />
        <section className="nine columns container">

          {utils.renderIf(!this.props.user.avatar,
            <div>
              <h1>I see this is your first time logging in</h1>
              <h3>Feel free to upload an avatar and edit your profile </h3>


              <AuthForm
                buttonText="Update"
                onComplete={this.props.userUpdate}
                user={this.props.user}/>
            </div>
          )}

          {utils.renderIf(this.state.editUser,
            <div>
              <h1> Edit your profile</h1>
              <AuthForm
                buttonText="Update"
                onComplete={this.props.userUpdate}
                user={this.props.user}/>
            </div>
          )}

          <div className="user-form-container">
            <button onClick={this.handleEdit}>Edit Profile</button>

            {utils.renderIf(this.props.post,

              filtered.map(post =>
                <div key={post._id}>{
                  <PostItem key={post._id} post={post}
                  />
                }<br/></div>
              ))}
          </div>
        </section>
      </div>
    );
  }
}
// state.filter(item => item._id !== payload._id)
let mapStateToProps = state => ({
  user: state.user,
  auth: state.auth,
  post: state.post,
});

let mapDispatchToProps = dispatch => ({
  userCreate: user => dispatch(userCreateRequest(user)),
  userFetch: () => dispatch(userFetchRequest()),
  userUpdate: user => dispatch(userUpdateRequest(user)),
  postFetchAll: () => dispatch(postFetchAllRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer);
