import React, { Component } from 'react';
import {observer} from "mobx-react";

//custom components
import TasksFilter from './TasksFilter/TasksFilter';
import TasksList from './TasksList/TasksList';

//material components
import Paper from 'material-ui/Paper';

//import styles
import './style.scss';

@observer
class Tasks extends Component {
    render() {
        const {store} = this.props;
        // const styles = {
        //     container: {
        //         display: store.isSelectedCatagory ? 'block' : 'none',
        //     }
        // }
        return (
            <Paper className={`tasks ${!store.isSelectedCatagory ? 'tasks__empty' : ''}`}>
                <TasksFilter/>
                <TasksList store = {store}/>
            </Paper>
        );
    }
}

export default Tasks;