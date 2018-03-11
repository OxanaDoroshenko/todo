// import libraries
import React, {Component} from 'react';
import DevTools from 'mobx-react-devtools'

import observableTodoStore from './Store/Category';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Reboot from 'material-ui/Reboot';

//import components
import Categories from './Categories';
import Tasks from './Tasks';

//import styles
import './App.css';

const theme = createMuiTheme();



class App extends Component {
    render() {
        debugger;
      return (
            <MuiThemeProvider theme={theme}>
                <DevTools/>
                <Reboot/>
                <div className="App">
                    <Categories store={ observableTodoStore }/>
                    <Tasks store={ observableTodoStore }/>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
