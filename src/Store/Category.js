import {observable, computed, action, autorun} from "mobx";

class CategoriesStore {
    /*
     category list data
     */
    @observable categoryData = {
        selectedCategoryId: null,
        byId: {
            0: {
                id: 0,
                name: 'category 0',
                isOpen: false,
                subCategories: [3,4,5],
                tasks: [0,],
                isSelected: false,
            },
            1: {
                id: 1,
                isOpen: true,
                name: 'category 1',
                subCategories: [],
                isSelected: false,
            },
            2: {
                id: 2,
                isOpen: true,
                name: 'category 2',
                subCategories: [],
                isSelected: false,
            },
            3: {
                id: 3,
                parentCategoryId: 0,
                isOpen: true,
                name: 'category 0 3',
                subCategories: [],
                isSelected: false,
            },
            4: {
                id: 4,
                parentCategoryId: 0,
                isOpen: true,
                name: 'category 0 4',
                subCategories: [],
                isSelected: false,
            },
            5: {
                id: 5,
                parentCategoryId: 0,
                isOpen: true,
                name: 'category 0 5',
                subCategories: [],
                isSelected: false,
            },
        }
    };

    @observable categoryIds = [0, 2, 3, 4, 5];

    /*
     make array from category list object
     */
    @computed get getAllCategories() {
        return this.categoryIds.map((categoryId) => this.categoryData.byId[categoryId]);
    };

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

    @action addNestedCategory(category) {
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

    @action updateCategory(id, category) {
        this.categoryData.byId[id] = {...this.categoryData.byId[id], ...category};
    }

    @action deleteCategory(id, startDeleting) {
        const parentId = this.categoryData.byId[id].parentCategoryId;
        if (startDeleting){
            if(typeof parentId!=='undefined'){
                const subCategoryIds = this.categoryData.byId[parentId].subCategories;
                this.categoryData.byId[parentId].subCategories = subCategoryIds.filter((subCategoryId)=>id!==subCategoryId);
            }
            this.categoryData.selectedCategoryId = null;
        }
        const subCategoryIds = this.categoryData.byId[id].subCategories;
        delete this.categoryData.byId[id];
        this.categoryIds = this.categoryIds.filter((categoryId) => categoryId !== id);
        for (let i = 0; i < subCategoryIds.length; ++i) {
            const delCategoryId = subCategoryIds[i];
            this.deleteCategory(delCategoryId, false);
        }
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
    @computed get isSelectedCatagory() {
        return typeof this.categoryData.selectedCategoryId === 'number';
    }

    /*
     get category id for new category
     */
    @computed get nextCategoryId() {
        const maxCategoryId = this.categoryIds.length ? Math.max(...this.categoryIds) : 0;
        return maxCategoryId + 1;
    }

    /*
     is category modal form active (visible)
     */
    @observable isEditingCategory = false;

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
    @computed get isCategoryEditing() {
        return this.editingCategoryData.mode === 'edit';
    }

    /*
     set initial data for editing category
     */
    @action initCategoryEditing(editingData) {
        this.isEditingCategory = true;
        this.editingCategoryData = {...editingData, mode: 'edit'};
    }

    /*
     set initial data for deleting category
     */
    @action initCategoryDeleting(editingData) {
        this.isEditingCategory = true;
        this.editingCategoryData = {...editingData, mode: 'edit'};
    }

    /*
     set initial data for created nested category
     */
    @action initNestedCategoryCreating(editingData) {
        this.isEditingCategory = true;
        this.editingCategoryData = {parentId: editingData.id, mode: 'create'};
    }

    /*
     reset category modal form data by closing modal
     */
    @action closeEditingCategoryDialog(isEditing, categoryId = null) {
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
    @action changeCategoryData(data) {
        this.editingCategoryData = {
            ...this.editingCategoryData,
            ...data,
        };
    }
}

const categoriesStore = new CategoriesStore();

autorun(() => {
    console.log(categoriesStore.categoryData.selectedCategoryId);
})


export default categoriesStore;