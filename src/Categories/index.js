import React, { Component } from 'react';

//import components
import CreateForm from './CreatingCategoryForm/CreatingCategoryForm';
import CategoriesTree from './CategoryTree/CategoriesTree';
import EditingDialog from './CategoryDialog/CategoryDialog';
import Paper from 'material-ui/Paper';

//import styles
import './style.css';

class Categories extends Component {
    render() {
        return (
        <Paper className="category">
                <CreateForm store = {this.props.store}/>
                <CategoriesTree store = {this.props.store}/>
                <EditingDialog store = {this.props.store}/>
        </Paper>
        );
    }
}

export default Categories;