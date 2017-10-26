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
            <li><Link to="/gallery">KritterPub</Link></li>
            <li>Friends</li>
            <li>Events</li>
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
