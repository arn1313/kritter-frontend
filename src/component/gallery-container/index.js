import React from 'react';
import {connect} from 'react-redux';
import {Grid, Row, Col, Jumbotron, Button, Modal} from 'react-bootstrap';
import * as utils from '../../lib/utils';
import PostItem from '../post-item';
import {postFetchAllRequest} from '../../action/post-actions.js';

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
      <div>
        <Jumbotron>
          <h1>Group Memories</h1>
          <p>Live their adventures</p>
        </Jumbotron> 
        
        <Row>
          {utils.renderIf(this.props.post,
            this.props.post.map(post =>
              <Col sm={6} md={3} key={post._id}>{
                <PostItem key={post._id} 
                  post={post}
                  renderText={'photoOnly'}
                />
              }<br/></Col>
            ))}
        </Row>
        
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


