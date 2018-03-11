import {observable, computed, action, autorun} from "mobx";

class TodoStore {
    /*
    category list data
     */
    @observable categoryData = {
        selectedCategoryId: 0,
        byId: {
            0: {
                id: 0,
                name: 'category 1',
                isOpen: true,
                subCategories: [2, 3, 7],
                tasks: [0,],
                isSelected: true,
            },
            2: {
                id: 2,
                parentCategoryId: 0,
                isOpen: true,
                name: 'category 1 1',
                subCategories: [9],
                isSelected: false,
            },
            3: {
                id: 3,
                isOpen: true,
                parentCategoryId: 0,
                name: 'category 1 2',
                subCategories: [10],
                isSelected: false,
            },
            7: {
                id: 7,
                parentCategoryId: 0,
                name: 'category 1 7',
                subCategories: [],
                isSelected: false,
            },
            9: {
                id: 9,
                parentCategoryId: 2,
                name: 'category 1 1 9',
                subCategories: [],
                isSelected: false,
            },
            10: {
                id: 10,
                parentCategoryId: 3,
                name: 'category 1 2 10',
                subCategories: [],
                isSelected: false,
            },
            4: {
                id: 4,
                isOpen: false,
                name: 'category 2',
                subCategories: [],
                isSelected: false,
            },
            5: {
                id: 5,
                isOpen: false,
                name: 'category 3',
                subCategories: [],
                isSelected: false,
            }
        }
    };

    @observable categoryIds = [0, 2, 3, 4, 5];

    /*
    make array from category list object
     */
    @computed get getAllCategories() {
        return this.categoryIds.map((categoryId) => this.categoryData.byId[categoryId]);
    };

    /*
    get all tasks by id of selected category
     */
    @computed get getSelectedTasks() {
        const tasks = this.tasksIds.map((taskId) => this.tasks.byId[taskId]);
        return tasks.filter((task) => task.categoryId === this.categoryData.selectedCategoryId);
    };

    /*
     tasks list data
     */
    @observable tasks = {
        byId: {
            [0]: {
                id: 0,
                categoryId: 0,
                name: 'to do 1',
                isDone: false,
            },
            [1]: {
                id: 1,
                categoryId: 1,
                name: 'to do 2',
                isDone: false,
            },
            [2]: {
                id: 2,
                categoryId: 2,
                name: 'to do 3',
                isDone: false,
            }
        }
    };
    @observable tasksIds = [0, 1, 2];

    @action addCategory(category) {
        const categoryId = this.nextCategoryId;
        const newCategory = {
            ...category,
            id: categoryId,
            isOpen: false,
            subCategories: [],
            tasks: [],
            isSelected: false,
        };
        this.categoryIds.unshift(categoryId);
        this.categoryData.byId[categoryId] = newCategory;
    }

    @action addNestedCategory(category){
        const categoryId = this.nextCategoryId;
        const parentId = category.parentCategoryId;
        const parentCategoryChildren = this.categoryData.byId[parentId].subCategories.concat([categoryId]);
        const newCategory = {
            ...category,
            id: categoryId,
            isOpen: false,
            subCategories: [],
            tasks: [],
            isSelected: false,
        };
        this.categoryIds.unshift(categoryId);
        this.categoryData.byId[categoryId] = newCategory;
        this.categoryData.byId[parentId].subCategories = parentCategoryChildren;
    }

    @action updateCategory(id, category){
        this.categoryData.byId[id] = {...this.categoryData.byId[id], ...category};
    }

    @action deleteCategory(id){
        //TODO remove category with id="id" && all tasks with categoryId = "id"
    }

    toggleCategoryOpenState(id) {
        //TODO ad prevent default (reject selecting on opening)
        this.categoryData.byId[id].isOpen = !this.categoryData.byId[id].isOpen;
    }

    toggleCategorySelectState(id, state) {
        if (state) {
            for (let i in this.categoryData.byId) {
                this.categoryData.byId[i].isSelected = false;
            }
            this.categoryData.byId[id].isSelected = true;
            this.categoryData.selectedCategoryId = id;
        } else {
            this.categoryData.byId[id].isSelected = false;
            this.categoryData.selectedCategoryId = null;
        }
    }

    /*
    is any category in list was selected
     */
    @computed get isSelectedCatagory(){
        return typeof this.categoryData.selectedCategoryId === 'number';
    }

    /*
    get category id for new category
     */
    @computed get nextCategoryId (){
        const maxCategoryId = this.categoryIds.length ? Math.max(...this.categoryIds) : 0;
        return maxCategoryId + 1;
    }

    /*
    is category modal form active (visible)
     */
    @observable isEditingCategory = false;
    @observable isEditingTask = false;

    /*
    initial data for editing category modal form
     */
    @observable editingCategoryData = {
        name: '',
        id: null,
        parentId: null,
    };

    /*
    initial data for editing category modal form
     */
    @observable deletingCategoryData = {
        name: '',
        id: null,
    };

    /*
    check is an edit mode in category model form
     */
    @computed get isCategoryEditing(){
        return this.editingCategoryData.mode === 'edit';
    }

    /*
    set initial data for editing category
     */
    @action initCategoryEditing(editingData){
        this.isEditingCategory = true;
        this.editingCategoryData = {...editingData, mode: 'edit'};
    }
    /*
    set initial data for deleting category
     */
    @action initCategoryDeleting(editingData){
        this.isEditingCategory = true;
        this.editingCategoryData = {...editingData, mode: 'edit'};
    }

    /*
    set initial data for created nested category
     */
    @action initNestedCategoryCreating(editingData){
        this.isEditingCategory = true;
        this.editingCategoryData = {parentId: editingData.id, mode: 'create'};
    }
    /*
    reset category modal form data by closing modal
     */
    @action closeEditingCategoryDialog(isEditing, categoryId = null){
        this.isEditingCategory = false;
        this.editingCategoryData = {
            name: '',
            id: null,
            parentId: null,
        };
    }
    /*
    changing data in modal form in realtime
     */
    @action changeCategoryData(data){
        this.editingCategoryData = {
            ...this.editingCategoryData,
            ...data,
        };
    }
}

const todoStore = new TodoStore();

autorun(() => {
    console.log(todoStore.categoryData.selectedCategoryId);
})


export default todoStore;