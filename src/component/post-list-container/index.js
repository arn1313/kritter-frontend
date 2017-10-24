import React from 'react';
import * as utils from '../../lib/utils';
import PostItem from '../post-item';
import {connect} from 'react-redux';

class PostList extends React.Component {
  constructor(props){
    super(props);
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

});

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
