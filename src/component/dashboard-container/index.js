import React from 'react';
import {connect} from 'react-redux';
import {userFetchRequest} from '../../action/auth-actions';
import {postCreateRequest, postFetchAllRequest} from '../../action/post-actions';
import {Button} from 'react-bootstrap';
import PostForm from '../post-form';
import PostList from '../post-list-container';
import Aside from '../aside';



class DashboardContainer extends React.Component {
  constructor(props){
    super(props);
    this.state ={
    };
  }

  componentWillMount(){
  }



  render() {
    console.log('__USER__', this.props.user, '__USER__');


    return (
      <div className="container">
        <Aside />
        <section className="nine columns container">
          <PostForm
            buttonText={'submit'}
            onComplete={this.props.postCreate}
            user={this.props.user ? this.props.user : {lulwat: 'hahahah'}} />
          <PostList />
        </section>
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

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
