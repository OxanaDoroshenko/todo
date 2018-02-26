import React, {Component} from 'react';

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

const categoryData = {
        0: {
            id: 0,
            name: 'category 1',
            isOpen: true,
            subCategories: [2, 3, 7],
        },
        2: {
            id: 2,
            parentCategoryId: 0,
            isOpen: true,
            name: 'category 1 1',
            subCategories: [9]
        },
        3: {
            id: 3,
            isOpen: true,
            parentCategoryId: 0,
            name: 'category 1 2',
            subCategories: [10]
        },
        7: {
            id: 7,
            parentCategoryId: 0,
            name: 'category 1 7',
            subCategories: []
        },
        9: {
            id: 9,
            parentCategoryId: 2,
            name: 'category 1 1 9',
            subCategories: []
        },
        10: {
            id: 10,
            parentCategoryId: 3,
            name: 'category 1 2 10',
            subCategories: []
        },
        4: {
            id: 4,
            isOpen: false,
            name: 'category 2',
            subCategories: [],
        },
        5: {
            id: 5,
            isOpen: false,
            name: 'category 3',
            subCategories: [],
        }
    };

const categoryIds = [0,2,3,4,5];

export const getAllCategories = () =>{
    return categoryIds.map((categoryId) => categoryData[categoryId]);
};


class CategoriesTree extends Component {
    constructor(props) {
        super(props);
    }

    toggleOpenState = (id) =>{

    }

    getSubtree = (subCategories, dataById) =>{
        let childList = [];
        for (let j = 0; j < subCategories.length; ++j) {
            const subCategoryIndex = subCategories[j];
            const targetCategory = dataById[subCategoryIndex];
            let prevListItemIcon = targetCategory.isOpen
                ? <ListItemIcon>
                    <ArrowDropup />
                </ListItemIcon>
                : <ListItemIcon>
                    <ArrowDropdown />
                </ListItemIcon>;
            childList.push(
                <ListItem button
                          className="category__tree__item--nested"
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
                <Collapse in={targetCategory.isOpen} timeout="auto" unmountOnExit key={`childList-${targetCategory.id}`}>
                    <List component="div">
                        {newChildList}
                    </List>
                </Collapse>
            );
        }
        return childList;
    }

    getCategoriesTree = (data, dataById) => {
        const categoriesTree = [];
        for (let i = 0; i < data.length; ++i) {
            if (typeof data[i].parentCategoryId == 'undefined') {
                let prevListItemIcon = data[i].isOpen
                    ? <ListItemIcon>
                        <ArrowDropup />
                    </ListItemIcon>
                    : <ListItemIcon>
                        <ArrowDropdown />
                    </ListItemIcon>;
                categoriesTree.push(
                    <ListItem button
                              className="category__tree__item"
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
        const categoriesTree = this.getCategoriesTree(getAllCategories(categoryData), categoryData);
        return (
            <div className="category__tree">
                {categoriesTree}
            </div>
        );
    }
}

export default CategoriesTree;