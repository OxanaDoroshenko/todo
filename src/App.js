// import libraries
import React, {Component} from 'react';

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
        return (
            <MuiThemeProvider theme={theme}>
                <Reboot/>
                <div className="App">
                    <Categories/>
                    <Tasks/>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
