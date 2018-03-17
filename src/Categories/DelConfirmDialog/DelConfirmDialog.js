import React from 'react';
import TextField from 'material-ui/TextField';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import {observer, inject} from 'mobx-react';

@inject('categoriesStore')
@observer
class DelConfirmDialog extends React.Component {
    constructor(props) {
        super(props);
        const {categoriesStore} = this.props;
        this.state = {
            categoryName: categoriesStore.editingCategoryData.name,
        }
    }

    handleClose = () => {
        const {categoriesStore} = this.props;
        categoriesStore.closeDeletingCategoryDialog();
    };

    deleteCategory = () => {
        const {categoriesStore} = this.props;
        categoriesStore.deleteCategory(categoriesStore.deletingCategoryData.id, true);
        categoriesStore.closeDeletingCategoryDialog();
    };

    render() {
        const {categoriesStore} = this.props;
        return (
            <div>
                <Dialog
                    open={categoriesStore.isDeletingCategory}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Deleting category</DialogTitle>
                    <DialogContent>
                        {`Are you sure you want to delete category ${categoriesStore.deletingCategoryData.name}?`}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={this.deleteCategory} color="primary">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default DelConfirmDialog;