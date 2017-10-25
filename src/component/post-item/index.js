import React from 'react';
import * as utils from '../../lib/utils';
import PostForm from '../post-form';
import {connect} from 'react-redux';
import {Modal, Button} from 'react-bootstrap';
import {postDeleteRequest, postUpdateRequest} from '../../action/post-actions.js';

class PostItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      edit: false,
      showModal: false, 
    };
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {

  }


  render () {
    return (
      <div>
        <div>
          <img src={this.props.post.ownerAvatar} />
          <h2>{this.props.post.ownerName}</h2>
          <h4>{this.props.post.timeStamp}</h4>
          <p>{this.props.post.description}</p>
          <img src={this.props.post.url} />
          <Button bsStyle="primary" onClick={() =>this.setState({showModal: !this.state.showModal, edit: !this.state.edit})}>Edit</Button>

          {/* <button onClick={() => this.setState({edit: !this.state.edit})}>Edit</button> */}
        </div>

        {utils.renderIf(this.state.edit,
          <div className="static-modal">
            <Modal show={this.state.showModal}>
              <Modal.Header>
                <Modal.Title>Update Your Post</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <PostForm
                  hideUploadForm={'hideUploadForm'}
                  post={this.props.post}
                  buttonText='update'
                  onComplete={this.props.updatePost}
                />

              </Modal.Body>   
              <Modal.Footer>
                <Button onClick={this.close}>Close</Button>
              </Modal.Footer>  
            </Modal>
          </div>
 
        )}
      </div>
    );
  }
}

let mapStateToProps = state => ({
});

let mapDispatchToProps = dispatch => ({
  
  deletePhoto: (post) => dispatch(postDeleteRequest(post)),
  updatePost: (post) => dispatch(postUpdateRequest(post)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);
