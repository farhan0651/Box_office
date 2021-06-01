import {useReducer,useEffect} from 'react'

function showsReducer(previousState,action){
    switch(action.type){
        case 'ADD':{
        return [...previousState,action.showId]}
        case 'Remove':{
            return previousState.filter(showId=>showId!==action.showId)
        }
        default: return previousState
    }
}

function UserPersistedReducer(reducer,initialState,key){
    
    const [state,dispatch]=useReducer(reducer,initialState,(initial)=>{
        const persisted=localStorage.getItem(key);
        return persisted ? JSON.parse(persisted) :initial
    })
    
    useEffect(()=>{
        localStorage.setItem(key,JSON.stringify(state))
    },[state,key])
    
    return [state,dispatch];
}

export function  useShows(key = 'shows'){
    return UserPersistedReducer(showsReducer,[],key);
}