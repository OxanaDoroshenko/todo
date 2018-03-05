import React, { Component } from 'react';

//import components
import CreateForm from './CreatingCategoryForm/CreatingCategoryForm';
import CategoriesTree from './CategoryTree/CategoriesTree';
import Paper from 'material-ui/Paper';

//import styles
import './style.css';

class Categories extends Component {
    render() {
        return (
        <Paper className="category">
                <CreateForm/>
                <CategoriesTree store = {this.props.store}/>
        </Paper>
        );
    }
}

export default Categories;