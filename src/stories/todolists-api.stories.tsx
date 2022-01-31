import React, {useEffect, useState} from 'react'
import axios from 'axios';


export default {
    title: 'API'
}
const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '55360c88-929c-4769-8aa8-2c2f9e14b649'
    }

}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
       let x =  axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', {withCredentials: true})
            .then((res) => {
                setState(res.data);
            })
                // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        debugger
        const title = 'hhhhh'
        let y = axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: title}, {withCredentials: true}).then( (res) => {
            setState(res.data);
        } )
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
