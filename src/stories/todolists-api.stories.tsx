import React, {useEffect, useState} from 'react'
import {todolistApi} from "../api/todolists-api";


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
      todolistApi.getTodolist() .then((res) => {
                setState(res.data);
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.createTodolist().then( (res) => {
            setState(res.data);
        } )
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "64a8e037-037c-4b43-9dcf-9ceb23057d91";
        todolistApi.deleteTodolist(todolistId).then( (res) => {
            setState(res.data);
        })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "852b0d6a-659b-42e9-9437-520c9f8c0d0c"
        const title = '8888888'
        todolistApi.updateTodolist(todolistId,title).then((res) => {
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
