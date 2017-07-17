import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import ModalWindowList from './ModalWindowList';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

const customContentStyle = {
  maxWidth: '400px',
  minWidth: '320px'
};

const customOverlayStyle = {
  background: 'black',
  opacity: 0.05
};

const customActionsContainerStyle = {
  textAlign: 'left',
  padding: '0'
};

const customModalBodyStyle = {
  borderBottom: 'none',
};

export default class ModalWindow extends React.Component {
  constructor(props) {
    super(props);
    debugger
    this.state = {
      open: false,
      save: true,
      listItems: this.initializeListItems()
    };
  }

  initializeListItems = () => {
    let listItems = JSON.parse(window.sessionStorage.getItem("listItems"));
    return listItems || [
      { id: 0, selectValue: 1, inputValue: 22 },
      { id: 1, selectValue: 2, inputValue: 12 },
      { id: 2, selectValue: 3, inputValue: 4 }
    ]
  }

  getNextState = (props) => {
    this.setState({ listItems: props });
  };

  handleOpen = () => {
    this.setState({ open: true, save: true });
    document.body.addEventListener('keydown', (e) => {
      if (e.keyCode===13) {
        this.handleSave();
      }
    })
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleAdd = () => {
    this.refs.list.addNewListItem();
  };

  handleCancel = () => {
    this.setState({ open: false });
  };

  handleSave = () => {
    this.refs.list.handleSave();
    this.setState({ open: false });
  };
  
  ableSaveButton=()=>{
    this.setState({save:false})
  }

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
        disabled={this.state.save}
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
            modal={false}
            contentStyle={customContentStyle}
            open={this.state.open}
            onRequestClose={this.handleClose}
            overlayStyle={customOverlayStyle}
            autoScrollBodyContent={true}
            contentClassName='modal-container'
            actionsContainerStyle={customActionsContainerStyle}
            bodyStyle={customModalBodyStyle}
            children={<ModalWindowList nextState={this.state.listItems} getNextState={this.getNextState} ableSaveButton = {this.ableSaveButton} ref='list' />}>
          </Dialog>
        </div>
      </MuiThemeProvider>
    );
  }
}