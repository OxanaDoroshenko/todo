import React from 'react';
import TextField from 'material-ui/TextField';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import {observer} from 'mobx-react';

@observer
class CategoryEditingDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryName: this.props.store.editingCategoryData.name,
        }
    }

    handleClose = () => {
        const {store} = this.props;
        store.closeEditingCategoryDialog();
    };

    submitCategory = () => {
        const {store} = this.props;
        store.isCategoryEditing
            ? store.updateCategory(store.editingCategoryData.id, {name:store.editingCategoryData.name})
            : store.addNestedCategory({name: store.editingCategoryData.name, parentCategoryId: store.editingCategoryData.parentId})
        store.closeEditingCategoryDialog();
    };

    onChange = (event) => {
        const {store} = this.props;
        store.changeCategoryData({name: event.target.value});
    };

    render() {
        const {store} = this.props;
        return (
            <div>
                <Dialog
                    open={store.isEditingCategory}
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
                            value={this.props.store.editingCategoryData.name}
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