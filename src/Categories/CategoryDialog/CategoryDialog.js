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
class CategoryEditingDialog extends React.Component {
    constructor(props) {
        super(props);
        const {categoriesStore} = this.props;
        this.state = {
            categoryName: categoriesStore.editingCategoryData.name,
        }
    }

    handleClose = () => {
        const {categoriesStore} = this.props;
        categoriesStore.closeEditingCategoryDialog();
    };

    submitCategory = () => {
        const {categoriesStore} = this.props;
        categoriesStore.isCategoryEditing
            ? categoriesStore.updateCategory(categoriesStore.editingCategoryData.id, {name:categoriesStore.editingCategoryData.name})
            : categoriesStore.addNestedCategory({name: categoriesStore.editingCategoryData.name, parentCategoryId: categoriesStore.editingCategoryData.parentId})
        categoriesStore.closeEditingCategoryDialog();
    };

    onChange = (event) => {
        const {categoriesStore} = this.props;
        categoriesStore.changeCategoryData({name: event.target.value});
    };

    render() {
        const {categoriesStore} = this.props;
        return (
            <div>
                <Dialog
                    open={categoriesStore.isEditingCategory}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Category</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            onChange={this.onChange}
                            placeholder="Print category name..."
                            margin="dense"
                            id="name"
                            label="Category name"
                            value={categoriesStore.editingCategoryData.name}
                            type="text"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={this.submitCategory} color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default CategoryEditingDialog;