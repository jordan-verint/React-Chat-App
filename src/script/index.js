import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Application from './containers/App';

class ChatApp extends Component{
  render() {
    return <Application />
  }
}


ReactDOM.render( <ChatApp />, document.getElementById('app') );