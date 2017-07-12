import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const items = [
  <MenuItem key={1} value={1} primaryText="Twin" />,
  <MenuItem key={2} value={2} primaryText="Tripple" />,
  <MenuItem key={3} value={3} primaryText="Quadro" />,
];

const selectIconStyle = {
  color: '4a4a4a',
  fill: '4a4a4a'
};

export default class ModalWindowSelect extends React.Component {
  render() {
    return (
      <SelectField
        value={this.props.value}
        onChange={this.props.changeSelectValue}
        iconStyle={selectIconStyle}
        style={{ width: 150 }}
      >
        {items}
      </SelectField>
    );
  }
}
