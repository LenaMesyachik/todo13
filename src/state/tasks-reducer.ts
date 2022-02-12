import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType, setTodosACType} from './todolists-reducer';
import {TasksStateType} from '../App';
import {TaskPriorities, TaskStatuses, TaskType, todolistApi} from "../api/todolists-api";
import {Dispatch} from "redux";


export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    task:TaskType
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    todolistId: string,
    taskId: string,
    status: TaskStatuses
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    todolistId: string
    taskId: string
    title: string
}
export type SetTasksActionType = {
    type: 'SET-TASKS',
    tasks: TaskType[],
    todolistID: string
}

type ActionsType = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType | setTodosACType | SetTasksActionType

const initialState: TasksStateType = {}


export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {

        case 'SET-TODOS':
            const copyState = {...state}
            action.todolists.forEach((tl) => {
                return copyState[tl.id] = []
            })
            return copyState

        case 'SET-TASKS':
            const copyState1 = {...state}
                copyState1[action.todolistID] = action.tasks
            return copyState1

        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id != action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}

            const tasks = stateCopy[action.task.todolistId];
            const newTasks = [action.task, ...tasks];
            stateCopy[action.task.todolistId] = newTasks;
            return stateCopy;
        }
        case 'CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, status: action.status} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todolistId];
            // найдём нужную таску:
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, title: action.title} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolistId]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (task:TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', status, todolistId, taskId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}
}

export const setTasksAC = (tasks: TaskType[], todolistId: string) => {
    return { type: 'SET-TASKS', tasks, todolistId
    } as const
}

export const setTaskTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistApi.getTasks(todolistId)
            .then((response) => {
                debugger
                let tasks = response.data.items
                dispatch(setTasksAC(tasks,todolistId))
            })
    }
}
export const removeTaskTC = (todolistId:string, taskId:string) => {
    return(dispatch:Dispatch) => {
        todolistApi.deleteTask(todolistId, taskId)
            .then((response) => {
                if (response.data.resultCode === 0) {
              dispatch(removeTaskAC(taskId, todolistId))} ;
            })
    }
}
export const addTaskTC = (todolistId:string,title:string) => (dispatch:Dispatch) =>{
    todolistApi.createTask(todolistId,title)
        .then((response)=>{
            let task = response.data.data.item
            dispatch(addTaskAC(task))
})

}
/*
export const  setTasksThunk = (dispatch:Dispatch) => {
    todolistApi.getTasks()
        .then((response) => {

        })
}
*/
