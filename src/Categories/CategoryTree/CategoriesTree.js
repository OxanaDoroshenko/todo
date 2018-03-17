import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';

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
import './style.scss';

@inject('categoriesStore')
@observer
class CategoriesTree extends Component {
    getCategoryActions = (category) => {
        const {categoriesStore} = this.props;
        return <ListItemSecondaryAction>
            <IconButton aria-label="Actions" onClick={()=>{categoriesStore.initCategoryEditing(category)}}>
                <Edit />
            </IconButton>
            <IconButton aria-label="Actions" onClick={()=>{categoriesStore.initNestedCategoryCreating(category)}}>
                <Add />
            </IconButton>
            <IconButton aria-label="Actions" onClick={()=>{
                categoriesStore.initCategoryDeleting(category);
            }}>
                <Delete />
            </IconButton>
        </ListItemSecondaryAction>;
    };

    getSubtree = (subCategories, dataById) => {
        const {categoriesStore} = this.props;
        let childList = [];
        for (let j = 0; j < subCategories.length; ++j) {
            const subCategoryIndex = subCategories[j];
            const targetCategory = dataById[subCategoryIndex];
            let prevListItemIcon = targetCategory.isOpen
                ? <ListItemIcon onClick={() => {
                    categoriesStore.toggleCategoryOpenState(targetCategory.id)
                }}>
                    <ArrowDropup />
                </ListItemIcon>
                : <ListItemIcon onClick={() => {
                    categoriesStore.toggleCategoryOpenState(targetCategory.id)
                }}>
                    <ArrowDropdown />
                </ListItemIcon>;
            childList.push(
                <ListItem button
                          style={{backgroundColor: targetCategory.isSelected ? '#cccccc' : 'transparent'}}
                          className="category__tree__item--nested"
                          onClick={() => {
                              categoriesStore.toggleCategorySelectState(targetCategory.id, !targetCategory.isSelected)
                          }}
                          key={`category-${targetCategory.id}`}>
                    {prevListItemIcon}
                    <ListItemText inset primary={targetCategory.name}/>
                    {this.getCategoryActions(targetCategory)}
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
        const {categoriesStore} = this.props;
        const categoriesTree = [];
        for (let i = 0; i < data.length; ++i) {
            if (typeof data[i].parentCategoryId === 'undefined') {
                let prevListItemIcon = data[i].isOpen
                    ? <ListItemIcon onClick={() => {
                        categoriesStore.toggleCategoryOpenState(data[i].id)
                    }}>
                        <ArrowDropup />
                    </ListItemIcon>
                    : <ListItemIcon onClick={() => {
                        categoriesStore.toggleCategoryOpenState(data[i].id)
                    }}>
                        <ArrowDropdown />
                    </ListItemIcon>;
                categoriesTree.push(
                    <ListItem button
                              style={{backgroundColor: data[i].isSelected ? '#cccccc' : 'transparent'}}
                              className="category__tree__item"
                              onClick={() => {
                                  categoriesStore.toggleCategorySelectState(data[i].id, !data[i].isSelected)
                              }}
                              key={`category-${data[i].id}`}>
                        {prevListItemIcon}
                        <ListItemText inset primary={data[i].name}/>
                        {this.getCategoryActions(data[i])}
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
        const {categoriesStore} = this.props;
        const categoriesTree = this.getCategoriesTree(categoriesStore.getAllCategories, categoriesStore.categoryData.byId);
        return (
            <div className="category__tree">
                {categoriesTree}
            </div>
        );
    }
}

export default CategoriesTree;