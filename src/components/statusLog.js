import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from 'redux';
import createFragment from 'react-addons-create-fragment';

class StatusLog extends Component {



  render() {
    return (
      <div>
      <h1></h1>
      </div>
    )
  };

}

function mapStateToProps(state){
  return {
    state: state
  };
}

export default connect(mapStateToProps)(StatusLog);
