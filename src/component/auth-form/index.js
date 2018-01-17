import React from 'react';
import * as utils from '../../lib/utils';
import { stringify } from 'querystring';

class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.user ?
      {
        ...props.user,
        _id: this.props.user._id,
        username: '',
        password: '',
        email: '',
        bio: '',
        avatar: '',
        species: '',
        usernameError: null,
        passwordError: null,
        emailError: null,
        error: null,
      } :
      {
        username: '',
        password: '',
        email: '',
        bio: '',
        avatar: '',
        species: '',
        usernameError: null,
        passwordError: null,
        emailError: null,
        error: null
      };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(e) {
    let { name, value } = e.target;
    this.setState({
      [name]: value,
      usernameError: name === 'username' && !value ? 'username must have a value' : null,
      emailError: name === 'email' && !value ? 'email must have a value' : null,
      passwordError: name === 'password' && !value ? 'password must have a value' : null,
    });

    if (name === 'avatar') {
      let { files } = e.target;
      let avatar = files[0];
      this.setState({ avatar });

      utils.photoToDataUrl(avatar)
        .then(preview => this.setState({ preview }))
        .catch(console.error);
    }

  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onComplete(this.state)
      .then(() => this.props.redirect('/home'))
      .catch(error => {
        console.error(error);
        this.setState({ error });
      });
  }

  render() {
    return (
      <div className="auth signup-form">
        <form
          onSubmit={this.handleSubmit}
          className="auth-form">

          {utils.renderIf(this.props.auth === 'login',
            <div className="login-auth">
              <div className="login-row">
                <div className="six columns">
                  {utils.renderIf(this.state.usernameError,
                    <span className="tooltip">{this.state.usernameError}</span>
                  )}

                  <label for="username">Full Name</label>
                  <input
                    type="text"
                    name="username"
                    // placeholder="name"
                    value={this.state.username}
                    onChange={this.handleChange} />
                </div>

                <div className="six columns">
                  {utils.renderIf(this.state.emailError,
                    <span className="tooltip">{this.state.emailError}</span>
                  )}
                  <label for="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    // placeholder="password"
                    value={this.state.password}
                    onChange={this.handleChange} />
                </div>
              </div>
            </div>
          )}


          {utils.renderIf(this.props.auth === 'signup',
            <section className="signup-form">
              <div className="row">
                <div className="six columns">
                  {utils.renderIf(this.state.usernameError,
                    <span className="tooltip">{this.state.usernameError}</span>
                  )}
                  <label for="username">Full Name</label>
                  <input
                    type="text"
                    name="username"
                    // placeholder="name"
                    value={this.state.username}
                    onChange={this.handleChange} />
                </div>

                <div className="six columns">
                  <label for="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    // placeholder="email"
                    value={this.state.email}
                    onChange={this.handleChange} />
                </div>
              </div>

              <div className="row">
                <div className="six columns">
                  <label for="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    // placeholder="password"
                    value={this.state.password}
                    onChange={this.handleChange} />
                </div>

                <div className="six columns">
                  <label for="species">Species</label>
                  <input
                    type="text"
                    name="species"
                    // placeholder="species"
                    value={this.state.species}
                    onChange={this.handleChange} />
                </div>
              </div>

              <div>
                <label for="bio">Bio</label>
                <textarea
                  className="u-full-width"
                  name="bio"
                  cols="30"
                  rows="5"
                  value={this.state.bio}
                  onChange={this.handleChange}>
                </textarea>
              </div>
            </section>
          )}

          <div>
            {utils.renderIf(this.props.buttonText === 'Update',
              <section className="update-form">
                <div className="row">
                  <div className="six columns">
                    <label for="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="email"
                      value={this.state.email}
                      onChange={this.handleChange} />
                  </div>
                  <div className="six columns">
                    <label for="species">Species</label>
                    <input
                      type="text"
                      name="species"
                      placeholder="species"
                      value={this.state.species}
                      onChange={this.handleChange} />
                  </div>

                </div>

                <label for="bio">Bio</label>

                <textarea
                  className="u-full-width"
                  name="bio"
                  cols="30"
                  rows="5"
                  value={this.state.bio}
                  onChange={this.handleChange}>
                </textarea>
                <label for="avatar">Avatar</label>
                <img src={this.state.preview} style={{ 'width': '25%' }} />
                <input
                  type="file"
                  name="avatar"
                  onChange={this.handleChange} />
              </section>
            )}
          </div>

          {utils.renderIf(this.state.passwordError,
            <div>
              <span className="tooltip">{this.state.passwordError}</span>
            </div>
          )}

          <button className="submit-button" type='submit'>{this.props.buttonText}</button>
        </form>
      </div>
    );
  }
}

export default AuthForm;
