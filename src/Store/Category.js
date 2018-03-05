import {observable, computed, autorun} from "mobx";

class TodoStore {
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

    @computed get getAllCategories() {
        return this.categoryIds.map((categoryId) => this.categoryData.byId[categoryId]);
    };

    @computed get getSelectedTasks() {
        const tasks = this.tasksIds.map((taskId) => this.tasks.byId[taskId]);
        return tasks.filter((task)=> task.categoryId === this.categoryData.selectedCategoryId);
    };

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
    // get completedTodosCount() {
    //     return this.todos.filter(
    //         todo => todo.completed === true
    //     ).length;
    // }
    //
    // report() {
    //     if (this.todos.length === 0)
    //         return "<none>";
    //     return `Next todo: "${this.todos[0].task}". ` +
    //         `Progress: ${this.completedTodosCount}/${this.todos.length}`;
    // }
    //
    // addTodo(task) {
    //     this.todos.push({
    //         task: task,
    //         completed: false,
    //         assignee: null
    //     });
    // }
    toggleCategoryOpenState(id) {
        this.categoryData.byId[id].isOpen = !this.categoryData.byId[id].isOpen;
    }

    selectCategory(id) {
        for (let i in this.categoryData.byId) {
            this.categoryData.byId[i].isSelected = false;
        }
        this.categoryData.byId[id].isSelected = true;
        this.categoryData.selectedCategoryId = id;
    }
}

const todoStore = new TodoStore();

autorun(() => {
    // console.log(todoStore.getAllCategories);
    console.log(todoStore.getSelectedTasks);
})


export default todoStore;