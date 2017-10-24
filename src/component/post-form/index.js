import React from 'react';
import * as utils from '../../lib/utils';
import {connect} from 'react-redux';

class PostForm extends React.Component {
  constructor(props){
    super(props);
    this.state = props.post
    ? props.post
    : {url: '', description: '', timeStamp: '', ownerName: this.props.user.username, ownerAvatar: this.props.user.avatar, preview: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let {name} = e.target;
    if(name === 'description') this.setState({description: e.target.value});
    if(name === 'photo') {
      let {files} = e.target;
      let url = files[0];
      this.setState({url});

      utils.photoToDataUrl(url)
        .then(preview => this.setState({preview}))
        .catch(console.error);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    return this.props.onComplete(this.state)
      .then(() => {
        if(!this.props.user){
          this.setState({url: '', description: '', timeStamp: new Date.prototype.getTime(), ownerName: this.props.user.username, ownerAvatar: this.props.user.avatar, preview: ''});
        }
      });
  }

  render () {
    return (
      <div className='form'>
        <h2>going to be the post form.</h2>


      </div>
    );
  }

}

let mapStateToProps = state => ({
  user: state.user,
});

let mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
