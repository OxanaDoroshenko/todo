import React, {Component} from 'react';
import {observer} from "mobx-react";

//material components
import Checkbox from 'material-ui/Checkbox';
import List, {ListItem, ListItemSecondaryAction, ListItemText} from 'material-ui/List';
import Edit from 'material-ui-icons/ModeEdit';
import IconButton from 'material-ui/IconButton';

//import styles
import './style.css';

const tasksData = [
    {
        id: 0,
        name: 'task 1',
        isDone: true,
        categoryId: 1,
    },
    {
        id: 1,
        name: 'task 2',
        isDone: false,
        categoryId: 1,
    },
    {
        id: 3,
        name: 'task 3',
        isDone: false,
        categoryId: 1,
    }
];
@observer
class TasksList extends Component {
    state = {
        checked: [0],
    };
    handleToggle = value => () => {
        const {checked} = this.state;
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        this.setState({
            checked: newChecked,
        });
    };

    render() {
        const {store} = this.props;
        return (
            <div className="tasks__list">
                <List>
                    {store.getSelectedTasks.map((task, index) => (
                        <ListItem
                            className="tasks__list__item"
                            key={`task-${index}`}
                        >
                            <Checkbox
                                // checked={this.state.checked.indexOf(value) !== -1}
                                tabIndex={-1}
                                disableRipple
                            />
                            <ListItemText primary={task.name}/>
                            <ListItemSecondaryAction>
                                <IconButton aria-label="Edit">
                                    <Edit />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </div>
        );
    }
}

export default TasksList;