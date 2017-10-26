import React from 'react';
import * as utils from '../../lib/utils';
import PostForm from '../post-form';
import {connect} from 'react-redux';
import {Modal, Button} from 'react-bootstrap';
import {postDeleteRequest, postUpdateRequest} from '../../action/post-actions.js';
import './_post-item.scss';


class PostItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      edit: false,
      showModal: false,
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.close = this.close.bind(this);
  }

  handleDelete() {
    return this.props.postDelete(this.props.post)
      .catch(console.error);
  }

  close() {
    this.setState({ showModal: !this.state.showModal, edit: !this.state.edit });
  }


  render () {
    console.log('******pos',this.props.post);
    return (
      <div>
        {utils.renderIf(this.props.renderText !== 'photoOnly',

          <div className="post">
            <div className="post-header">
              <img className="post-logo" style={{'width': '50px', 'height': '50px', 'border': '1px solid grey'}} src={this.props.post.ownerAvatar} />
              <span><h4>{this.props.post.ownerName}</h4><br />
                <h5>{this.props.post.timeStamp}</h5></span>
            </div>
            <p className="post-text">{this.props.post.description}</p>
            <img className="u-full-width" src={this.props.post.url} /><br />
            <Button bsStyle="danger" onClick={this.handleDelete}>Delete</Button>

            <Button bsStyle="primary" onClick={() =>this.setState({showModal: !this.state.showModal, edit: !this.state.edit})}>Edit</Button>

          </div>
        )}

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

        {utils.renderIf(this.props.renderText === 'photoOnly',
          <div className="static-modal">
            <h2>{this.props.post.ownerName}</h2>
            <img src={this.props.post.url}/>
          </div>

        )}
      </div>
    );
  }
}

let mapStateToProps = state => ({
});

let mapDispatchToProps = dispatch => ({

  postDelete: (post) => dispatch(postDeleteRequest(post)),
  updatePost: (post) => dispatch(postUpdateRequest(post)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);
