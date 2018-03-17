This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

Mobx+React

**TODO application**

**Project description**

**Categories tree**

On the rights side we have category tree. 

Each category has its own list of tasks and shows only them, even if the category has nested categories.

Selected category should be highlighted. 

If no category is selected hide right section with tasks input.

The categories tree may have infinite hierarchy.

When user adds new category it goes to top of the tree. 

The UI of how to get the name is a modal window for nested categories and input
on the top of the categories list for parents categories.

By clicking “Edit category” user can rename the category.

When user deletes category all the nested categories are also become deleted.

Confirmation should be shown. 

