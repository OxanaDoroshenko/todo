import React, { Component } from 'react';

//import components
import CreateForm from './CreatingCategoryForm/CreatingCategoryForm';
import CategoriesTree from './CategoryTree/CategoriesTree';
import EditingDialog from './CategoryDialog/CategoryDialog';
import DeletingDialog from './DelConfirmDialog/DelConfirmDialog';
import Paper from 'material-ui/Paper';

//import styles
import './style.scss';

class Categories extends Component {
    render() {
        return (
        <Paper className="category">
                <CreateForm/>
                <CategoriesTree/>
                <EditingDialog/>
                <DeletingDialog/>
        </Paper>
        );
    }
}

export default Categories;