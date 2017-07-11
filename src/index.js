import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ModalWindow from './components/ModalWindow';
import './index.css';


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
ReactDOM.render(<App />, document.getElementById('root'));