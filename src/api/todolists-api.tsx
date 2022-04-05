import axios, {AxiosResponse} from "axios";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': '55360c88-929c-4769-8aa8-2c2f9e14b649'
    }
})


export const todolistApi = {
    getTodolist() {
        return instance.get<Array<TodoType>>('/todo-lists')
    },
    createTodolist() {
        const title = 'hhhhh'
        return instance.post<ResponseType<{ item: TodoType }>>('/todo-lists', {title: title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType<{}>>(`/todo-lists/${todolistId}`)
    },

    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType<{}>>(`/todo-lists/${todolistId}`, {title: title})
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
    },
    createTask(todolistId: string, title: string) {
        return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TaskType }>>>(`todo-lists/${todolistId}/tasks`, {title});
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<UpdateTaskModelType, AxiosResponse<ResponseType<{ item: TaskType }>>>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
    }
}

type ResponseType<T = {}> = {
    fieldsErrors: string[],
    messages: string[],
    resultCode: number,
    data: T
}
export type TodoType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}
type CreateTodoType = {
    data: {
        item: TodoType
    },
    fieldsErrors: string[],
    messages: string[],
    resultCode: number
}
type DeleteUpdateTodoType = {
    data: {},
    fieldsErrors: string[],
    messages: string[],
    resultCode: number
}

export enum TaskStatuses {
    New,
    InProgress,
    Completed,
    Draft
}

export enum TaskPriorities {
    Low,
    Middle,
    Hi,
    Urgently,
    Later
}

export type TaskType = {
    description: string,
    title: string,
    status: TaskStatuses,
    priority: TaskPriorities,
    startDate: string,
    deadLine: string,
    id: string,
    todolistId: string,
    order: number,
    addedDate: string,
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}
