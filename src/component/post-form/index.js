import React from 'react';
import * as utils from '../../lib/utils';
import {connect} from 'react-redux';
import userFetchRequest from '../../action/auth-actions';

class PostForm extends React.Component {
  constructor(props){
    super(props);
    this.state = props.post
      ? props.post
      : {url: '', description: '', timeStamp: '', ownerName: this.props.user.username, ownerAvatar: this.props.user.avatar, preview: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    console.log('++++++++>lookhere',this.props.user);
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
      <div>
        <h1>THIS IS POST FORM</h1>
        <h2>Choose a photo to upload</h2>
        <br/>
        <form
          className="photoForm"
          onSubmit={this.handleSubmit}>

          <img src={this.state.preview} style={{'width': '25%'}}/>
          
          <input 
            type="file"
            name="photo"
            onChange={this.handleChange}/>
          <h2>Write a description for your photo</h2>

          <textarea 
            name="description" 
            cols="30" 
            rows="5"
            value={this.state.description}
            onChange={this.handleChange}>
          </textarea>

          <button type="submit">{this.props.buttonText}</button>
        </form>
        


      </div>
    );
  }

}



let mapStateToProps = state => ({
  // auth: state.auth,
  user: state.user,
  // username: state.username,
});

let mapDispatchToProps = dispatch => ({
  userFetch: () => dispatch(userFetchRequest()),
  
});

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
