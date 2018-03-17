import React, {Component} from 'react';
import {observer, inject} from "mobx-react";

//material components
import Checkbox from 'material-ui/Checkbox';
import List, {ListItem, ListItemSecondaryAction, ListItemText} from 'material-ui/List';
import Edit from 'material-ui-icons/ModeEdit';
import IconButton from 'material-ui/IconButton';

//import styles
import './style.css';

@inject('categoriesStore')
@inject('tasksStore')
@observer
class TasksList extends Component {
    state = {
        checked: [0],
    };
    // handleToggle = value => () => {
    //     const {checked} = this.state;
    //     const currentIndex = checked.indexOf(value);
    //     const newChecked = [...checked];
    //
    //     if (currentIndex === -1) {
    //         newChecked.push(value);
    //     } else {
    //         newChecked.splice(currentIndex, 1);
    //     }
    //
    //     this.setState({
    //         checked: newChecked,
    //     });
    // };

    render() {
        const {tasksStore, categoriesStore} = this.props;
        const selectedCategory = categoriesStore.categoryData.selectedCategoryId;
        const tasks = tasksStore.getTasksByCategoryId(selectedCategory);
        return (
            <div className="tasks__list">
                <List>
                    {tasks.map((task, index) => (
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