import React from 'react';
import {connect} from 'react-redux';
import {Grid, Row, Col, Jumbotron, Button, Modal} from 'react-bootstrap';
import * as utils from '../../lib/utils';
import PostItem from '../post-item';
import {postFetchAllRequest} from '../../action/post-actions.js';
import '../post-item/_post-item.scss';
import './_gallery-container.scss';


class GalleryContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
    // this.toggleFormStart = this.toggleFormStart.bind(this);
    // this.close = this.close.bind(this);
  }
  // componentDidMount(){
  //   this.props.photoFetchAll();
  // }




  render() {
    return (
      <div className="what">
        {utils.renderIf(this.props.post,
          this.props.post.map(post =>
            <div className="gallery-column">
              <PostItem key={post._id}
                post={post}
                renderText={'photoOnly'}
              />
            </div>
          ))}
      </div>
    );
  }
}

let mapStateToProps = state => ({
  auth: state.auth,
  post: state.post,
  user: state.user,
});

let mapDispatchToProps = dispatch => ({
  postFetchAll: () => dispatch(postFetchAllRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GalleryContainer);
