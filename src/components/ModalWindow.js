import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

/*-------------------- Modal window--------------------------*/

const customContentStyle = {
  maxWidth: '400px',
  minWidth: '320px'
};

const customOverlayStyle = {
  background: 'black',
  opacity: 0.05
};

const listButtonStyle = {
  color: '#f44336',
  fill: '#f44336',
  background: '#fbe6e9',
  border: '3px solid #fbe6e9',
  borderRadius: '50%'
};
const customActionsContainerStyle = {
  textAlign: 'left',
  padding: '0'
}

const customModalBodyStyle = {
  borderBottom: 'none',
}


export default class ModalWindow extends React.Component {
  constructor(props) {
    super(props);
debugger
    this.state = {
      open: false,
      listItems: this.initializeListItems ()
      
    };
  }
  initializeListItems = () => {
   let listItems=JSON.parse(window.sessionStorage.getItem("listItems"));
   return listItems|| [
        { id: 0, selectValue: 1, inputValue: 22 },
        { id: 1, selectValue: 2, inputValue: 12 },
        { id: 2, selectValue: 3, inputValue: 4 }
      ] }
  callBack = (props) => {
    this.setState({ listItems: props });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleAdd = () => {
    this.refs.list.addNewListItem();
  };

  handleCancel = () => {
    //this.refs.list.handleCancel();
    this.setState({ open: false });
  };

  handleSave = () => {
    this.refs.list.handleSave();
    this.setState({ open: false });
  };

  render() {
    const actions = [
      <FlatButton
        label='Добавить'
        primary={true}
        onTouchTap={this.handleAdd}
        className='add-button'
      />,
      <RaisedButton
        label='Сохранить'
        primary={true}
        onTouchTap={this.handleSave}
      />,
      <FlatButton
        label='Отмена'
        primary={true}
        onTouchTap={this.handleCancel}
      />,
    ];

    return (
      <MuiThemeProvider>
        <div>
          <RaisedButton label='Открыть' onTouchTap={this.handleOpen} />
          <Dialog
            title={<div className='header'>
              <div className='header-title'>Структура номеров</div>
              <IconButton hoveredStyle={{ background: '#ccc' }} style={{ borderRadius: '50%' }} onTouchTap={this.handleClose}><NavigationClose /></IconButton></div>}
            actions={actions}
            modal={true}
            contentStyle={customContentStyle}
            open={this.state.open}
            overlayStyle={customOverlayStyle}
            autoScrollBodyContent={true}
            contentClassName='modal-container'
            actionsContainerStyle={customActionsContainerStyle}
            bodyStyle={customModalBodyStyle}
            children={<ModalWindowList nextState={this.state.listItems} callBack={this.callBack} ref='list' />}>
          </Dialog>
        </div>
      </MuiThemeProvider>
    );
  }
}

/*----------------------LIST--------------------*/

class ModalWindowList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listItems: this.props.nextState
    }
    this.counter = 100;
    this.listItems = JSON.parse(JSON.stringify(this.state.listItems));
    this.callBack = this.props.callBack;
  }

  handleSave = () => {
    window.sessionStorage.setItem("listItems", JSON.stringify(this.listItems));
    this.callBack(this.listItems);
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
  };

  deleteListItem = (id) => {
    this.listItems = this.listItems.filter(function (elem) {
      return elem.id !== id;
    });
    this.forceUpdate();
  };

  changeSelectValue = (listItemId, e, index, value) => {
    for (let i = 0; i < this.listItems.length; i++) {
      if (this.listItems[i].id === listItemId) {
        this.listItems[i].selectValue = value;
      }
    }
    this.forceUpdate();
  };

  changeInputValue = (listItemId, e, value) => {
    for (let i = 0; i < this.listItems.length; i++) {
      if (this.listItems[i].id === listItemId) {
        this.listItems[i].inputValue = value;
      }
    }
    this.forceUpdate();
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

/*-------------------- Select--------------------------*/

const items = [
  <MenuItem key={1} value={1} primaryText="Twin" />,
  <MenuItem key={2} value={2} primaryText="Tripple" />,
  <MenuItem key={3} value={3} primaryText="Quadro" />,
];

const selectIconStyle = {
  color: '4a4a4a',
  fill: '4a4a4a'
};

class ModalWindowSelect extends React.Component {



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


/*---------------------Input------------------------*/
class ModalWindowInput extends Component {

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