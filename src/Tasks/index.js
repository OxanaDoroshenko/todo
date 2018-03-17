import React, { Component } from 'react';
import {observer, inject} from "mobx-react";

//custom components
import TasksFilter from './TasksFilter/TasksFilter';
import TasksList from './TasksList/TasksList';

//material components
import Paper from 'material-ui/Paper';

//import styles
import './style.scss';

@inject('categoriesStore')
@observer
class Tasks extends Component {
    render() {
        const {categoriesStore} = this.props;
        // const styles = {
        //     container: {
        //         display: store.isSelectedCatagory ? 'block' : 'none',
        //     }
        // }
        return (
            <Paper className={`tasks ${!categoriesStore.isSelectedCatagory ? 'tasks__empty' : ''}`}>
                <TasksFilter/>
                <TasksList/>
            </Paper>
        );
    }
}

export default Tasks;