import axios from "axios";

export const todolistApi = {
    getTodolist() {
        let x = axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', {withCredentials: true})
        return x
    },
    createTodolist() {
        const title = 'hhhhh'
        let y = axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: title}, {
            withCredentials: true, headers: {
                'API-KEY': '55360c88-929c-4769-8aa8-2c2f9e14b649'
            }
        })
        return y
    },
    deleteTodolist(todolistId:string) {
        let promise = axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {
            withCredentials: true,
            headers: {
                'API-KEY': '55360c88-929c-4769-8aa8-2c2f9e14b649'
            }
        })
        return promise
    },
    updateTodolist(todolistId:string,title:string) {
        let pr = axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title: title}, {
            withCredentials: true,
            headers: {
                'API-KEY': '55360c88-929c-4769-8aa8-2c2f9e14b649'
            }
        })
        return pr
    }
}