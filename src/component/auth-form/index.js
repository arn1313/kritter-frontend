import React from 'react';
import * as utils from '../../lib/utils';
import {Button} from 'react-bootstrap';
import {stringify} from 'querystring';

class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      bio: '',
      avatar: '',
      usernameError: null,
      passwordError: null,
      emailError: null,
      error: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let {name, value} = e.target;
    this.setState({
      [name]: value,
      usernameError: name === 'username' && !value ? 'username must have a value' : null,
      emailError: name === 'email' && !value ? 'email must have a value' : null,
      passwordError: name === 'password' && !value ? 'password must have a value' : null,
    });

    // if(name === 'avatar') {
    //   let {files} = e.target; 
    //   let avatar = files[0];
    //   this.setState({avatar});

    //   utils.photoToDataUrl(avatar)
    //     .then(preview => this.setState({preview}))
    //     .catch(console.error);
    // }

  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onComplete({
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      bio: this.state.bio,
      // avatar: this.state.avatar,
    })
      .then(() => this.props.redirect('/home'))
      .catch(error => {
        console.error(error);
        this.setState({error});
      });
  }

  render() {

    return (
      <form
        onSubmit={this.handleSubmit}
        className="auth-form">

        {utils.renderIf(this.state.usernameError, 
          <span className="tooltip">{this.state.usernameError}</span>
        )}

        <input 
          type="text"
          name="username"
          placeholder="username"
          value={this.state.username}
          onChange={this.handleChange}/><br/>

        {utils.renderIf(this.state.emailError,
          <span className="tooltip">{this.state.emailError}</span>
        )}

        {utils.renderIf(this.props.auth === 'signup', 
          <div>
            <input
              type="email"
              name="email"
              placeholder="email"
              value={this.state.email}
              onChange={this.handleChange} /><br/>

            <textarea 
              name="bio" 
              cols="30" 
              rows="5"
              value={this.state.bio}
              onChange={this.handleChange}>
            </textarea><br/>
          </div>
        )}

        {utils.renderIf(this.state.passwordError,
          <span className="tooltip">{this.state.passwordError}</span>
        )}

        <input 
          type="password"
          name="password"
          placeholder="password"
          value={this.state.password}
          onChange={this.handleChange}/><br/>

        {/* <img src={this.state.preview} style={{'width': '25%'}}/><br/>
        <input 
          type="file"
          name="avatar"
          onChange={this.handleChange}/><br/> */}


        <Button bsStyle="primary" type='submit'>{this.props.auth}</Button>
      </form>
    );
  }
}

export default AuthForm;