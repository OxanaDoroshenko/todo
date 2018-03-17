import {observable, computed, action, autorun} from "mobx";
// import categoryStore from '../Store/Category';
class TasksStore {
    /*
     get all tasks by id of selected category
     */
    getTasksByCategoryId(categoryId) {
        const tasks = this.tasksIds.map((taskId) => this.tasks.byId[taskId]);
        return tasks.filter((task) => task.categoryId === categoryId);
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

    /*
     make array from category list object
     */
    @computed get getAllTasks() {
        return this.tasksIds.map((categoryId) => this.tasks.byId[categoryId]);
    };

    /*
     get task id for new task
     */
    @computed get nextTaskId (){
        const maxCategoryId = this.tasksIds.length ? Math.max(...this.tasksIds) : 0;
        return maxCategoryId + 1;
    }

    /*
     is task modal form active (visible)
     */
    @observable isEditingTask = false;
}

const tasksStore = new TasksStore();

export default tasksStore;