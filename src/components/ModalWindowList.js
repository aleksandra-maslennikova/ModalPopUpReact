import React, { Component } from 'react';
import ModalWindowSelect from './ModalWindowSelect';
import ModalWindowInput from './ModalWindowInput';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

const listButtonStyle = {
  color: '#f44336',
  fill: '#f44336',
  background: '#fbe6e9',
  border: '3px solid #fbe6e9',
  borderRadius: '50%'
};

export default class ModalWindowList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listItems: this.props.nextState
    }
    this.counter = 100;
    this.listItems = JSON.parse(JSON.stringify(this.state.listItems));
    this.getNextState = this.props.getNextState;
    this.ableSaveButton = this.props.ableSaveButton;
  }


  handleSave = () => {
    window.sessionStorage.setItem("listItems", JSON.stringify(this.listItems));
    this.getNextState(this.listItems);
  };

  generateId = () => {
    return this.counter++;
  };

  addNewListItem = () => {
    let newItem = { id: this.generateId(), selectValue: 1, inputValue: 0 };
    let newItems = this.listItems.slice();
    newItems.push(newItem);
    this.listItems = newItems;
    this.forceUpdate();
    this.ableSaveButton();
  };

  deleteListItem = (id) => {
    this.listItems = this.listItems.filter(function (elem) {
      return elem.id !== id;
    });
    this.forceUpdate();
    this.ableSaveButton();
  };

  changeSelectValue = (listItemId, e, index, value) => {
    for (let i = 0; i < this.listItems.length; i++) {
      if (this.listItems[i].id === listItemId) {
        this.listItems[i].selectValue = value;
      }
    }
    this.forceUpdate();
    this.ableSaveButton();
  };

  changeInputValue = (listItemId, e, value) => {
    for (let i = 0; i < this.listItems.length; i++) {
      if (this.listItems[i].id === listItemId) {
        this.listItems[i].inputValue = value;
      }
    }
    this.forceUpdate();
    this.ableSaveButton();
  };

  createListItem = (listItem) => {
    return (<li className='my-list-item' key={listItem.id} >
      <ModalWindowSelect value={listItem.selectValue} changeSelectValue={(e, index, value) => this.changeSelectValue(listItem.id, e, index, value)} dataIdx={listItem.id} />
      <ModalWindowInput value={listItem.inputValue} changeInputValue={(e, value) => this.changeInputValue(listItem.id, e, value)} id={'i' + this.generateId()} />
      <IconButton iconStyle={listButtonStyle} className='icon-button' onTouchTap={() => this.deleteListItem(listItem.id)} ><NavigationClose /></IconButton>
    </li>)
  };

  render() {
    let items = this.listItems.map((item, index) =>
      this.createListItem(item)
    )
    return (<form><ul className='my-list'>
      {items}
    </ul>
    </form>)
  };
};