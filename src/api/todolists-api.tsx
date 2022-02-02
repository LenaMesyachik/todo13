import axios from "axios";


const instance = axios.create({
    baseURL:'https://social-network.samuraijs.com/api/1.1',
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
       return  instance.post<ResponseType<{item:TodoType}>>('/todo-lists', {title: title})
    },
    deleteTodolist(todolistId:string) {
         return instance.delete<ResponseType<{}>>(`/todo-lists/${todolistId}`)
    },

    updateTodolist(todolistId:string,title:string) {
       return instance.put<ResponseType<{}>>(`/todo-lists/${todolistId}`, {title: title})
    }
}

type ResponseType <T> = {
    fieldsErrors: string[],
    messages:string[],
    resultCode: number,
    data:T
}
type TodoType = {
    id: string,
    title: string,
    addedDate:string,
    order: number
}
type CreateTodoType = {
    data:{
        item:   TodoType
    },
    fieldsErrors: string[],
    messages:string[],
    resultCode: number
   }
type DeleteUpdateTodoType = {
    data:{ },
    fieldsErrors:string[],
    messages:string[],
    resultCode: number
}
