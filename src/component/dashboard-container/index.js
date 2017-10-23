import React from 'react';
import {connect} from 'react-redux';


class DashboardContainer extends React.Component {
  constructor(props){
    super(props);
    this.state ={
    };
  }

  render() {
    return (
      <div>
        <h1>this will be your homepage stream</h1>
      </div>
    );
  }
}


let mapStateToProps = state => ({

});

let mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);

