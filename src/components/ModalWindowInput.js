import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

export default class ModalWindowInput extends Component {
  render() {
    return (
      <TextField
        type='number'
        style={{ width: 50, cursor: 'pointer' }}
        onChange={this.props.changeInputValue}
        defaultValue={this.props.value}
        id={this.props.id}
      />
    );
  }
}