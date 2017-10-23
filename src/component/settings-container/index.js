import React from 'react';
import {connect} from 'react-redux';

class SettingsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <h2>We are in the settings</h2>
      </div>
    );
  }
}

let mapStateToProps = state => ({

});

let mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer);
