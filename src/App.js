// import libraries
import React, {Component} from 'react';
import DevTools from 'mobx-react-devtools'

import categoriesStore from './Store/Category';
import tasksStore from './Store/Task';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
// src/components/App.js

import { Provider } from 'mobx-react';
import Reboot from 'material-ui/Reboot';

//import components
import Categories from './Categories';
import Tasks from './Tasks';

//import styles
import './App.css';

const theme = createMuiTheme();



class App extends Component {
    render() {
      return (
      <Provider categoriesStore={ categoriesStore } tasksStore={ tasksStore }>
          <MuiThemeProvider theme={theme} >
              <DevTools/>
              <Reboot/>
              <div className="App">
                  <Categories/>
                  <Tasks/>
              </div>
          </MuiThemeProvider>
      </Provider>

        );
    }
}

export default App;
