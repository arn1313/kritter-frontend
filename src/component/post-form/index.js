import React from 'react';
import './_post-form.scss';
import * as utils from '../../lib/utils';
import {connect} from 'react-redux';
import userFetchRequest from '../../action/auth-actions';

class PostForm extends React.Component {
  constructor(props){
    super(props);

    let emptyState = {url: '', description: '', timeStamp: new Date(), ownerId: props.account._id, ownerName: props.account.username, ownerAvatar: props.account.avatar, preview: ''};
    this.state = props.post ? props.post : emptyState;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.account)
      this.setState({
        ownerName: nextProps.account.username,
        ownerAvatar: nextProps.account.avatar,
        ownerId: nextProps.account.id,
        timeStamp: new Date(),

      });
  }

  componentDidUpdate(){
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
      .then((console.log('******sentoffstate', this.state)))
      .then(() => {
        if(!this.props.user){
          this.setState({url: '', description: '', timeStamp: new Date(), ownerId: this.props.user._id, ownerName: this.props.user.username, ownerAvatar: this.props.user.avatar, preview: ''});
        }
      });
  }

  render () {
    return (
      <div className='row form-form'>
        <form
          className="postFormform"
          onSubmit={this.handleSubmit}>

          <textarea
            className="u-full-width"
            placeholder="what's up?"
            name="description"
            value={this.state.description}
            onChange={this.handleChange}>
          </textarea>

          <div className="row">
            <div className="nine columns">
              <input
                className="u-full-width"
                type="file"
                name="photo"
                onChange={this.handleChange}/>

              {/* <div className="container u-full-width picture-thing">
              <img src={this.state.preview} style={{'width': '25%'}}/></div> */}
            </div>
            <button type="submit">{this.props.buttonText}</button>
          </div>
        </form>
      </div>
    );
  }
}



let mapStateToProps = state => {

  return {
    account: {...state.user},

  };
};
let mapDispatchToProps = dispatch => ({
  userFetch: () => dispatch(userFetchRequest()),

});

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
