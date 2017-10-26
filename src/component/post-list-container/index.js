import React from 'react';
import * as utils from '../../lib/utils';
import PostItem from '../post-item';
import {postFetchAllRequest} from '../../action/post-actions.js';
import {connect} from 'react-redux';

class PostList extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  render () {
    return (
      <div>
        {utils.renderIf(this.props.post,
          this.props.post.map(post =>
            <div key={post._id}>{
              <PostItem key={post._id} post={post}
              />
            }<br/></div>
          ))}
      </div>
    );
  }
}

let mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
  post: state.post,
});

let mapDispatchToProps = dispatch => ({
  postFetch: () => dispatch(postFetchAllRequest()),

});

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
