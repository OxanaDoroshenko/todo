import React, { Component } from 'react';
import {inject} from 'mobx-react';

//material components
import Input from 'material-ui/Input';
import Button from 'material-ui/Button';

//styles
import './style.scss';

@inject('categoriesStore')
class CreatingCategoryForm extends Component {
    constructor(props){
        super(props);
        this.state = {
          catagoryName: '',
        };
    }
    onChange = (event) => {
        this.setState({
            categoryName:event.target.value
        })
    };
    render() {
        const {categoriesStore} = this.props;
        return (
            <div className="category__form">
                <Input
                    className="category__form__input"
                    onChange={this.onChange}
                    placeholder="Print category name..."
                    inputProps={{
                        'aria-label': 'Description',
                    }}
                />
                <Button variant="raised"
                        onClick={()=>{categoriesStore.addCategory({name: this.state.categoryName})}}
                        size="small"
                        color="primary">
                    Add
                </Button>
            </div>
        );
    }
}

export default CreatingCategoryForm;