import React from 'react';
import { connect } from 'react-redux';
import { userFetchRequest } from '../../action/auth-actions';
import { postCreateRequest, postFetchAllRequest } from '../../action/post-actions';
import { Button } from 'react-bootstrap';
import PostForm from '../post-form';
import PostList from '../post-list-container';
import PopupDialog from '../PopupDialog'
import Aside from '../aside';



class DashboardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {


  }

  //THERES A BUG HERE WITH REDUX PERSIST THAT IS CAUSING THIS TO RERENDER THREE TIMES! THIS NEEDS TO BE ADDRESSED LATER. 

  render() {
    console.log('__USER__', this.props.user, '__USER__');


    return (
      <div className="container">
        {this.props.user.avatar == "" && this.props.user.persistedState ? <PopupDialog user={this.props.user} /> : undefined}
        <Aside />
        <section className="nine columns container">
          <PostForm
            buttonText={'submit'}
            onComplete={this.props.postCreate}
            user={this.props.user ? this.props.user : { lulwat: 'hahahah' }} />
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
