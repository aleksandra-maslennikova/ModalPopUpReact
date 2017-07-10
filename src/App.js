import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ModalWindow from './components/ModalWindow';


export default class App extends Component {
  render() {
    return (
   <div className='app-container'>
     <ModalWindow/>
  </div>
    );
  }
}

injectTapEventPlugin();


