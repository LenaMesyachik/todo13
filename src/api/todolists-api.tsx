import axios from "axios";


const instance = axios.create({
    baseURL:'/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': '55360c88-929c-4769-8aa8-2c2f9e14b649'
    }
})
export const todolistApi = {
    getTodolist() {
        return instance.get('/1.1/todo-lists')
    },
    createTodolist() {
        const title = 'hhhhh'
       return  instance.post('/1.1/todo-lists', {title: title})
    },
    deleteTodolist(todolistId:string) {
         return instance.delete(`/todo-lists/${todolistId}`)
    },

    updateTodolist(todolistId:string,title:string) {
       return instance.put(`/1.1/todo-lists/${todolistId}`, {title: title})
    }
}