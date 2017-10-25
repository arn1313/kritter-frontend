import React from 'react';
import {connect} from 'react-redux';
import {userFetchRequest} from '../../action/auth-actions';
import {postCreateRequest} from '../../action/post-actions';
import {Button} from 'react-bootstrap';
import PostForm from '../post-form';
import PostList from '../post-list-container';



class DashboardContainer extends React.Component {
  constructor(props){
    super(props);
    this.state ={
    };
  }

  componentDidMount(){
    console.log('__componentDidMount__');
    // this.props.userFetch();
  }



  render() {
    console.log(this.props.auth, '__AUTH__');
    console.log(this.props.user, '__USER__');
    console.log(this.props.username, '__USERNAMEEEE__');
    

    return (
      <div>
        <PostForm
          buttonText={'submit'}
          onComplete={this.props.postCreate}
          user={this.props.user ? this.props.user : {lulwat: 'hahahah'}} />
        <h1>this will be your homepage stream</h1>
        <PostList />
      </div>
    );
  }
}


let mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
  username: state.username,
});

let mapDispatchToProps = dispatch => ({
  userFetch: () => dispatch(userFetchRequest()),
  postCreate: (post) => dispatch(postCreateRequest(post)),

});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
