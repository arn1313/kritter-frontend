import React from 'react';
import * as utils from '../../lib/utils';
import PostForm from '../post-form';
import {connect} from 'react-redux';

class PostItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      edit: false,
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleDelete() {

  }

  handleUpdate(post) {

  }

  render () {
    return (
      <div>
        <img src={this.props.post.ownerAvatar} />
        <h2>{this.props.post.ownerName}</h2>
        <h4>{this.props.post.timeStamp}</h4>
        <p>{this.props.post.description}</p>
        <img src={this.props.post.url} />
        <button onClick={() => this.setState({edit: !this.state.edit})}>Edit</button>
      </div>
    );
  }
}

let mapStateToProps = state => ({

});

let mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);
