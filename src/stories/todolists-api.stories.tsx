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
        const todolistId = "1ce25ec5-c46f-489e-af3f-1c45ac68d8f5";
        todolistApi.deleteTodolist(todolistId).then( (res) => {
            setState(res.data);
        })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "d151af55-eecd-471e-8a75-1534310be09e"
        const title = '8888888'
        todolistApi.updateTodolist(todolistId,title).then((res) => {
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
