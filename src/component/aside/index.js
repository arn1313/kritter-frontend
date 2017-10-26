import React from 'react';
import {connect} from 'react-redux';
import {userFetchRequest} from '../../action/auth-actions';
import {postCreateRequest, postFetchAllRequest} from '../../action/post-actions';
import {Button} from 'react-bootstrap';
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
        <aside className="three columns">
          <ul>
            <li><img className="u-full-width" src={this.props.user.avatar ? this.props.user.avatar : 'upload'} /></li>
            <li>{this.props.user.username}</li>
            <li className="bio">{this.props.user.bio}</li>
            <li><Link to="/gallery">gallery</Link></li>
          </ul>
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
