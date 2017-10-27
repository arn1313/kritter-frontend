import React from 'react';
import * as utils from '../../lib/utils';
import PostItem from '../post-item';
import {postFetchAllRequest} from '../../action/post-actions.js';
import {connect} from 'react-redux';

class PostList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      sortedArray: this.props.post,
      
    };
  }
  
  
  render () {
    let sorted =  this.props.post.sort(function(a,b) {
      return b.exactTime - a.exactTime;
    });
    console.log('====>THIS IS SORTED', sorted);
    return (
      <div>
        {utils.renderIf(this.props.post,
          sorted.map(post =>
            <div key={post._id}>{
              <PostItem key={post._id} post={post}
              />
            }<br/></div>
          ))}
      </div>
    );
  }
}
//testing

let mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
  post: state.post,
});

let mapDispatchToProps = dispatch => ({
  postFetch: () => dispatch(postFetchAllRequest()),

});

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
