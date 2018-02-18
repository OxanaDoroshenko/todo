import React, { Component } from 'react';

//custom components
import TasksFilter from './TasksFilter/TasksFilter';
import TasksList from './TasksList/TasksList';

//material components
import Paper from 'material-ui/Paper';

//import styles
import './style.css';

class Tasks extends Component {
    render() {
        return (
            <Paper className="tasks">
                <TasksFilter/>
                <TasksList/>
            </Paper>
        );
    }
}

export default Tasks;