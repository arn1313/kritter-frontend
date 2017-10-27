import React from 'react';
import {connect} from 'react-redux';
import {userFetchRequest} from '../../action/auth-actions';
import {postCreateRequest, postFetchAllRequest} from '../../action/post-actions';
import PostForm from '../post-form';
import PostList from '../post-list-container';
import {Link} from 'react-router-dom';
import './_aside.scss';



class Aside extends React.Component {
  constructor(props){
    super(props);
    this.state ={
    };
  }

  componentWillMount(){
  }



  render() {

    return (
      <div className="row">
        <aside className="three columns nav-aside">
          <div className="aside-head"></div>
          <img className="aside-img" src={this.props.user.avatar ? this.props.user.avatar : 'upload'} />
          <h2 className="aside-username">{this.props.user.username}</h2>
          <p className="bio">{this.props.user.bio}</p>
          <Link to="/gallery">gallery</Link>
        </aside>
      </div>
    );
  }
}


let mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
});

let mapDispatchToProps = dispatch => ({
  userFetch: () => dispatch(userFetchRequest()),
  postCreate: (post) => dispatch(postCreateRequest(post)),
  postFetchAll: () => dispatch(postFetchAllRequest()),

});

export default connect(mapStateToProps, mapDispatchToProps)(Aside);
