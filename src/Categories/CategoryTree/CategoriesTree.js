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

const categoryData = [
    {
        id: 0,
        name: 'category 1',
        subCategories: [
            {
                id: 2,
                name: 'category 1 1',
                subCategories: []
            },
            {
                id: 3,
                name: 'category 1 2',
                subCategories: []
            }
        ]
    },
    {
        id: 4,
        name: 'category 2',
        subCategories: [],
    },
    {
        id: 5,
        name: 'category 3',
        subCategories: [],
    }
];


class CategoriesTree extends Component {
    constructor(props) {
        super(props);
    }

    getCategoriesTree = (data) => {
        const categoriesTree = [];
        for (let i = 0; i < data.length; ++i) {
            categoriesTree.push(<ListItem button
                                          className="category__tree__item"
                                          key={`category-${data[i].id}`}>
                <ListItemIcon>
                    <ArrowDropdown />
                </ListItemIcon>
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
        }
        return <List>{categoriesTree}</List>;
    };

    render() {
        const categoriesTree = this.getCategoriesTree(categoryData);
        return (
            <div className="category__tree">
                {categoriesTree}
                {/*<List>*/}
                {/**/}
                {/*{categoryData.map((category, index) => (*/}
                {/*<ListItem button*/}
                {/*className="category__tree__item"*/}
                {/*key={`category-${category.id}`}*/}
                {/*primaryText={category.name}*/}
                {/*rightIcon={<div className="category__tree__actions"><Edit/><Add/><Delete/></div>}*/}
                {/*leftIcon={<ArrowDropdown />}/>*/}
                {/*< Collapse in = {this.state.open} timeout="auto" unmountOnExit>*/}
                {/*<List component="div" disablePadding>*/}
                {/*<ListItem button>*/}

                {/*<ListItemText inset primary="Starred" />*/}
                {/*</ListItem>*/}
                {/*</List>*/}
                {/*</Collapse>*/}
                {/*))}*/}
                {/*</List>*/}
            </div>
        );
    }
}

export default CategoriesTree;