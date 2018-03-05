import React, {Component} from 'react';
import {observer} from 'mobx-react';

//material components
import Edit from 'material-ui-icons/ModeEdit';
import Delete from 'material-ui-icons/Delete';
import Add from 'material-ui-icons/Add';
import ArrowDropdown from 'material-ui-icons/ArrowDropDown';
import ArrowDropup from 'material-ui-icons/ArrowDropUp';
import List, {ListItem, ListItemSecondaryAction, ListItemText, ListItemIcon} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import Collapse from 'material-ui/transitions/Collapse';

//styles
import './style.css';

const taskData = {
    byId: {
        0: {
            id: 0,
            categoryId: 0,
            isDone: false,
            text: 'TO do test task',
        },
        1: {
            id: 1,
            categoryId: 1,
            isDone: false,
            text: 'TO do test task',
        }
    }
};

const tasksIds = [0,1,]

export const getAllTasks = () => {
    return tasksIds.map((taskId) => taskData.byId[taskId]);
};

export const getTasksByCategoryId = (categoryId) => {
    const allTasks = getAllTasks();
    return allTasks.filter((task) => task.categoryId == categoryId);
}


const categoryData = {
    selectedCategory: 0,
    byId: {
        0: {
            id: 0,
            name: 'category 1',
            isOpen: true,
            subCategories: [2, 3, 7],
            tasks: [0,],
            isSelected:true,
        },
        2: {
            id: 2,
            parentCategoryId: 0,
            isOpen: true,
            name: 'category 1 1',
            subCategories: [9],
            isSelected:false,
        },
        3: {
            id: 3,
            isOpen: true,
            parentCategoryId: 0,
            name: 'category 1 2',
            subCategories: [10],
            isSelected:false,
        },
        7: {
            id: 7,
            parentCategoryId: 0,
            name: 'category 1 7',
            subCategories: [],
            isSelected:false,
        },
        9: {
            id: 9,
            parentCategoryId: 2,
            name: 'category 1 1 9',
            subCategories: [],
            isSelected:false,
        },
        10: {
            id: 10,
            parentCategoryId: 3,
            name: 'category 1 2 10',
            subCategories: [],
            isSelected:false,
        },
        4: {
            id: 4,
            isOpen: false,
            name: 'category 2',
            subCategories: [],
            isSelected:false,
        },
        5: {
            id: 5,
            isOpen: false,
            name: 'category 3',
            subCategories: [],
            isSelected:false,
        }
    }
};

const categoryIds = [0, 2, 3, 4, 5];

export const getAllCategories = () => {
    return categoryIds.map((categoryId) => categoryData.byId[categoryId]);
};

@observer
class CategoriesTree extends Component {
    constructor(props) {
        super(props);
    }

    toggleOpenState = (id) => {

    }

    handleRequestChange(event, index) {
        this.setState({
            selectedIndex: index,
        });
        console.log(index);
    };

    getSubtree = (subCategories, dataById) => {
        const {store} = this.props;
        let childList = [];
        for (let j = 0; j < subCategories.length; ++j) {
            const subCategoryIndex = subCategories[j];
            const targetCategory = dataById[subCategoryIndex];
            let prevListItemIcon = targetCategory.isOpen
                ? <ListItemIcon onClick={()=>{store.toggleCategoryOpenState(targetCategory.id)}}>
                    <ArrowDropup />
                </ListItemIcon>
                : <ListItemIcon onClick={()=>{store.toggleCategoryOpenState(targetCategory.id)}}>
                    <ArrowDropdown />
                </ListItemIcon>;
            childList.push(
                <ListItem button
                          style={{ backgroundColor: targetCategory.isSelected ? '#cccccc' : 'transparent'}}
                          className="category__tree__item--nested"
                          onClick = {()=>{store.selectCategory(targetCategory.id)}}
                          key={`category-${targetCategory.id}`}>
                    {prevListItemIcon}
                    <ListItemText inset primary={targetCategory.name}/>
                    <ListItemSecondaryAction>
                        <IconButton aria-label="Actions">
                            <Edit />
                        </IconButton>
                        <IconButton aria-label="Actions">
                            <Add />
                        </IconButton>
                        <IconButton aria-label="Actions">
                            <Delete />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>)
            const newChildList = targetCategory.subCategories.length
                ? this.getSubtree(targetCategory.subCategories, dataById)
                : null;
            childList.push(
                <Collapse in={targetCategory.isOpen} timeout="auto" unmountOnExit
                          key={`childList-${targetCategory.id}`}>
                    <List component="div">
                        {newChildList}
                    </List>
                </Collapse>
            );
        }
        return childList;
    }

    getCategoriesTree = (data, dataById) => {
        const {store} = this.props;
        const categoriesTree = [];
        for (let i = 0; i < data.length; ++i) {
            if (typeof data[i].parentCategoryId == 'undefined') {
                let prevListItemIcon = data[i].isOpen
                    ? <ListItemIcon onClick={()=>{store.toggleCategoryOpenState(data[i].id)}}>
                        <ArrowDropup />
                    </ListItemIcon>
                    : <ListItemIcon onClick={()=>{store.toggleCategoryOpenState(data[i].id)}}>
                        <ArrowDropdown />
                    </ListItemIcon>;
                categoriesTree.push(
                    <ListItem button
                              style={{ backgroundColor: data[i].isSelected ? '#cccccc' : 'transparent'}}
                              className="category__tree__item"
                              onClick = {()=>{store.selectCategory(data[i].id)}}
                              key={`category-${data[i].id}`}>
                        {prevListItemIcon}
                        <ListItemText inset primary={data[i].name}/>
                        <ListItemSecondaryAction>
                            <IconButton aria-label="Actions">
                                <Edit />
                            </IconButton>
                            <IconButton aria-label="Actions">
                                <Add />
                            </IconButton>
                            <IconButton aria-label="Actions">
                                <Delete />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>);
                let childList = this.getSubtree(data[i].subCategories, dataById);
                categoriesTree.push(
                    <Collapse in={data[i].isOpen} timeout="auto" unmountOnExit key={`childList-${data[i].id}`}>
                        <List component="div">
                            {childList}
                        </List>
                    </Collapse>
                );
            }
        }
        return <List>{categoriesTree}</List>;
    };

    render() {
        const {store} = this.props;
        console.log(this.props);
        // console.log(store.getAllCategories,store.categoryData, store);
        const categoriesTree = this.getCategoriesTree(store.getAllCategories, store.categoryData.byId);
        return (
            <div className="category__tree">
                {categoriesTree}
            </div>
        );
    }
}

export default CategoriesTree;