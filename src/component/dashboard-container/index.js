import React from 'react';
import {connect} from 'react-redux';
import {userFetchRequest} from '../../action/auth-actions';
import {Button} from 'react-bootstrap';



class DashboardContainer extends React.Component {
  constructor(props){
    super(props);
    this.state ={
    };
    this.manualFetch = this.manualFetch.bind(this);
  }

  componentDidMount(){
    console.log('__componentDidMount__');
    this.props.userFetch();
  }

  manualFetch() {
    this.props.userFetch();
    console.log('__INSIDEMANUALFETCH');
  }

  render() {
    console.log(this.props.auth, '__AUTH__');
    console.log(this.props.user, '__USER__');
    
    return (
      <div>
        <h1>this will be your homepage stream</h1>
        <Button bsStyle="primary" onClick={this.manualFetch}>Edit Profile</Button>      </div>
    );
  }
}


let mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
});

let mapDispatchToProps = dispatch => ({
  userFetch: () => dispatch(userFetchRequest()),
  
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
