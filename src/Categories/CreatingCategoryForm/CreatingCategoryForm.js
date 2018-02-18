import React, { Component } from 'react';

//material components
import Input from 'material-ui/Input';
import Button from 'material-ui/Button';

//styles
import './style.css';

class CreatingCategoryForm extends Component {
    render() {
        return (
            <div className="category__form">
                <Input
                    className="category__form__input"
                    placeholder="Print category name..."
                    inputProps={{
                        'aria-label': 'Description',
                    }}
                />
                <Button variant="raised"
                        size="small"
                        color="primary">
                    Add
                </Button>
            </div>
        );
    }
}

export default CreatingCategoryForm;